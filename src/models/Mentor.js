import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MentorSchema = new mongoose.Schema(
  {
    Name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true 
    },
    Title: { 
      type: String, 
      required: [true, 'Title is required'],
      trim: true 
    },
    Bio: { 
      type: String, 
      required: [true, 'Bio is required'],
      trim: true 
    },
    Photo: { 
      type: String, 
      required: [true, 'Photo is required'],
      trim: true 
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
  },
  {
    timestamps: true,
    collection: 'Mentor',
  }
);

// Hash password before saving
MentorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// // Compare password method
MentorSchema.methods.comparePassword = async function (candidatePassword) {
  // Support both hashed and plain-text passwords (for legacy data)
  if (this.password && this.password.startsWith('$2')) {
    // Stored as bcrypt hash
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Fallback for plain-text stored passwords
  return candidatePassword === this.password;
};

// Remove password from JSON output
MentorSchema.methods.toJSON = function () {
  const mentor = this.toObject();
  delete mentor.password;
  return mentor;
};

export default mongoose.models.Mentor ||
  mongoose.model('Mentor', MentorSchema);
