// Script to seed the colleges collection with initial data
// Run this with: node scripts/seed-colleges.js

const mongoose = require('mongoose');

// College schema
const CollegeSchema = new mongoose.Schema({
  sr: { type: Number, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true, collection: 'colleges' });

const College = mongoose.models.College || mongoose.model('College', CollegeSchema);

// Sample college data
const collegesData = [
  { sr: 1, name: "University of Jammu", address: "Baba Saheb Ambedkar Road, Jammu Tawi, Jammu, J&K – 180006" },
  { sr: 2, name: "University of Kashmir", address: "Hazratbal, Srinagar, J&K – 190006" },
  { sr: 3, name: "Shri Mata Vaishno Devi University", address: "Sub-Post Office, SMVDU Campus, Katra, Reasi, J&K – 182320" },
  { sr: 4, name: "Government College for Women, Parade", address: "Parade Ground, Jammu, J&K – 180001" },
  { sr: 5, name: "Government Degree College, Baramulla", address: "Kanth Bagh, Baramulla, J&K – 193101" },
];

async function seedColleges() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "SIH" });
    console.log('Connected to MongoDB');

    // Clear existing data
    await College.deleteMany({});
    console.log('Cleared existing colleges data');

    // Insert new data
    await College.insertMany(collegesData);
    console.log('Successfully seeded colleges data');

    // Verify the data
    const count = await College.countDocuments();
    console.log(`Total colleges in database: ${count}`);

  } catch (error) {
    console.error('Error seeding colleges:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedColleges();
