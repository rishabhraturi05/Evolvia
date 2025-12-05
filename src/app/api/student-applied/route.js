import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import MentorApplication from '@/models/MentorApplication';
import User from '@/models/User';
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

// GET: Fetch all students who applied to the current mentor
export async function GET(request) {
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

    // Find all mentor applications where this mentor is in the mentorIds array
    const applications = await MentorApplication.find({
      mentorIds: mentorId
    }).populate('userId', 'firstName lastName email');

    if (!applications || applications.length === 0) {
      return NextResponse.json(
        { students: [] },
        { status: 200 }
      );
    }

    // Map students to match the expected format
    const students = applications.map((application) => {
      const student = application.userId;
      // Find the status for this mentor
      const mentorStatus = application.mentorStatuses?.find(
        ms => ms.mentorId.toString() === mentorId.toString()
      ) || { status: 'pending' };

      return {
        id: student._id,
        applicationId: application._id,
        name: `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Student',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        appliedAt: application.createdAt || null,
        status: mentorStatus.status || 'pending',
        respondedAt: mentorStatus.respondedAt || null,
        meetingDate: mentorStatus.meetingDate || null,
        meetingTime: mentorStatus.meetingTime || null,
        meetingScheduledAt: mentorStatus.meetingScheduledAt || null,
      };
    });

    return NextResponse.json(
      { students },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching student applications:', error);
    return NextResponse.json(
      { message: 'Failed to fetch student applications', error: error.message },
      { status: 500 }
    );
  }
}

