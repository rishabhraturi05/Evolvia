import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import MentorApplication from '@/models/MentorApplication';
import jwt from 'jsonwebtoken';

// Helper function to verify JWT token
function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    return null;
  }
}

// PATCH: Schedule a meeting with a student
export async function PATCH(request) {
  try {
    await connectToDatabase();

    // Verify authentication
    const decoded = verifyToken(request);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { message: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    const mentorId = decoded.userId;
    const { studentId, meetingDate, meetingTime } = await request.json();

    console.log('Schedule meeting request:', { mentorId, studentId, meetingDate, meetingTime });

    if (!studentId || !meetingDate || !meetingTime) {
      return NextResponse.json(
        { message: 'Student ID, meeting date, and meeting time are required' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const meetingDateTime = new Date(`${meetingDate}T${meetingTime}`);
    if (isNaN(meetingDateTime.getTime())) {
      return NextResponse.json(
        { message: 'Invalid date or time format' },
        { status: 400 }
      );
    }
    if (meetingDateTime <= new Date()) {
      return NextResponse.json(
        { message: 'Meeting date and time must be in the future' },
        { status: 400 }
      );
    }

    // Find the application for this student
    const application = await MentorApplication.findOne({ userId: studentId });
    
    console.log('Application found:', application ? 'Yes' : 'No');

    if (!application) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      );
    }

    // Check if this mentor is in the student's mentor list
    const mentorExists = application.mentorIds.some(
      id => {
        const idStr = id?.toString ? id.toString() : String(id);
        const mIdStr = mentorId?.toString ? mentorId.toString() : String(mentorId);
        return idStr === mIdStr;
      }
    );

    console.log('Mentor exists in list:', mentorExists);
    console.log('Mentor IDs in application:', application.mentorIds.map(id => id?.toString ? id.toString() : String(id)));

    if (!mentorExists) {
      return NextResponse.json(
        { message: 'This student has not applied to you' },
        { status: 404 }
      );
    }

    // Check if application is accepted
    const mentorStatus = application.mentorStatuses?.find(
      ms => {
        const msId = ms.mentorId?.toString ? ms.mentorId.toString() : String(ms.mentorId);
        const mId = mentorId?.toString ? mentorId.toString() : String(mentorId);
        return msId === mId;
      }
    );

    console.log('Mentor status found:', mentorStatus ? 'Yes' : 'No');
    console.log('Mentor status:', mentorStatus ? mentorStatus.status : 'N/A');

    if (!mentorStatus) {
      return NextResponse.json(
        { message: 'Mentor status not found. Please accept the application first.' },
        { status: 400 }
      );
    }

    if (mentorStatus.status !== 'accepted') {
      return NextResponse.json(
        { message: 'You must accept the application before scheduling a meeting' },
        { status: 400 }
      );
    }

    // Schedule the meeting directly
    try {
      if (mentorStatus) {
        mentorStatus.meetingDate = meetingDateTime;
        mentorStatus.meetingTime = meetingTime;
        mentorStatus.meetingScheduledAt = new Date();
        // Mark the path as modified to ensure Mongoose saves the changes
        application.markModified('mentorStatuses');
        await application.save();
      } else {
        return NextResponse.json(
          { message: 'Mentor status not found. Please accept the application first.' },
          { status: 400 }
        );
      }
    } catch (scheduleError) {
      console.error('Error scheduling meeting:', scheduleError);
      return NextResponse.json(
        { message: scheduleError.message || 'Failed to schedule meeting' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'Meeting scheduled successfully',
        meetingDate: meetingDateTime,
        meetingTime: meetingTime
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { 
        message: 'Failed to schedule meeting', 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

