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

// PATCH: Accept or reject a student's application
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
    const { studentId, status } = await request.json();

    if (!studentId || !status) {
      return NextResponse.json(
        { message: 'Student ID and status are required' },
        { status: 400 }
      );
    }

    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { message: 'Status must be either "accepted" or "rejected"' },
        { status: 400 }
      );
    }

    // Find the application for this student
    const application = await MentorApplication.findOne({ userId: studentId });

    if (!application) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      );
    }

    // Check if this mentor is in the student's mentor list
    const mentorExists = application.mentorIds.some(
      id => id.toString() === mentorId.toString()
    );

    if (!mentorExists) {
      return NextResponse.json(
        { message: 'This student has not applied to you' },
        { status: 404 }
      );
    }

    // Update the status using the method
    await application.updateMentorStatus(mentorId, status);

    return NextResponse.json(
      {
        message: `Application ${status} successfully`,
        status: status
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json(
      { message: 'Failed to update application status', error: error.message },
      { status: 500 }
    );
  }
}

