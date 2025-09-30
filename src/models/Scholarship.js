import mongoose from 'mongoose';

const ScholarshipSchema = new mongoose.Schema(
  {
    Name: { type: String },
    Eligibility: { type: String },
    Colleges: { type: String },
    Link: { type: String },
    // Also allow lowercase fields commonly used in your dataset
    name: { type: String },
    eligibility: { type: String },
    colleges: { type: String },
    link: { type: String },
    sr_no: { type: Number },
  },
  { timestamps: true, collection: 'sch' }
);

export default mongoose.models.Scholarship ||
  mongoose.model('Scholarship', ScholarshipSchema);
