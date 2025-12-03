import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Mentor from '@/models/Mentor';

export async function GET() {
  try {
    await connectToDatabase();
    const mentors = await Mentor.find({}).select('-password').lean();

    return NextResponse.json(mentors, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch mentors', error: error.message },
      { status: 500 }
    );
  }
}

