import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Scholarship from '@/models/Scholarship';

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await Scholarship.find({}).sort({ createdAt: -1 }).lean();

    const scholarships = docs.map((doc) => ({
      _id: doc._id,
      // Normalize names to match UI expectations
      Name: (doc.Name ?? doc.name) ?? '',
      Eligibility: (doc.Eligibility ?? doc.eligibility) ?? '',
      Colleges: (doc.Colleges ?? doc.colleges) ?? '',
      Link: (doc.Link ?? doc.link) ?? '',
      // Preserve other fields if needed
      sr_no: (doc.sr_no ?? doc.srNo) ?? doc.sr ?? undefined,
    }));

    return NextResponse.json(scholarships, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch scholarships', error: error.message },
      { status: 500 }
    );
  }
}
