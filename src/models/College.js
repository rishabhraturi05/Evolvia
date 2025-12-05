  import mongoose from "mongoose";

  const CollegeSchema = new mongoose.Schema(
    {
      srNo: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      courses: {
        type: String, // If you want array: [String]
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      entranceExams: {
        type: String,
        required: true,
      },
      returnOnInvestment: {
        type: String,
      },
      nirf: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      emailAddress: {
        type: String,
      },
      website: {
        type: String,
      },
      feesEstimates: {
        type: String,
      },
    },
    { timestamps: true,
      collection: 'colleges',
    }
    
  );
  
  export default mongoose.models.College ||
    mongoose.model("College", CollegeSchema);
  