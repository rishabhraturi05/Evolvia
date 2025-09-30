import mongoose from 'mongoose';

const CollegeSchema = new mongoose.Schema(
  {
    sr: { type: Number, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true, collection: 'colleges' }
);

export default mongoose.models.College ||
  mongoose.model('College', CollegeSchema);
