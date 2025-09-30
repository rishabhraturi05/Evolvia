import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import College from '@/models/College';

export async function GET() {
  try {
    await connectToDatabase();
    const colleges = await College.find({}).sort({ sr: 1 }).lean();

    return NextResponse.json(colleges, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch colleges', error: error.message },
      { status: 500 }
    );
  }
}
