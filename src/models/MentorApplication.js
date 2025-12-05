import mongoose from 'mongoose';

const MentorStatusSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  respondedAt: {
    type: Date
  },
  meetingDate: {
    type: Date
  },
  meetingTime: {
    type: String
  },
  meetingScheduledAt: {
    type: Date
  }
}, { _id: false });

const MentorApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
      unique: true,
      index: true
    },
    mentorIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mentor'
    }],
    mentorStatuses: [MentorStatusSchema]
  },
  {
    timestamps: true,
    collection: 'mentorapplications'
  }
);

// Ensure mentorIds array doesn't have duplicates
MentorApplicationSchema.methods.addMentor = function(mentorId) {
  if (!this.mentorIds.some(id => id.toString() === mentorId.toString())) {
    this.mentorIds.push(mentorId);
    // Also add to mentorStatuses with pending status
    if (!this.mentorStatuses.some(ms => ms.mentorId.toString() === mentorId.toString())) {
      this.mentorStatuses.push({
        mentorId: mentorId,
        status: 'pending'
      });
    }
  }
  return this.save();
};

// Update mentor status
MentorApplicationSchema.methods.updateMentorStatus = function(mentorId, status) {
  const mentorStatus = this.mentorStatuses.find(
    ms => ms.mentorId.toString() === mentorId.toString()
  );
  if (mentorStatus) {
    mentorStatus.status = status;
    mentorStatus.respondedAt = new Date();
  } else {
    // If status doesn't exist, create it
    this.mentorStatuses.push({
      mentorId: mentorId,
      status: status,
      respondedAt: new Date()
    });
  }
  return this.save();
};

// Schedule meeting
MentorApplicationSchema.methods.scheduleMeeting = function(mentorId, meetingDate, meetingTime) {
  const mentorStatus = this.mentorStatuses.find(
    ms => {
      const msId = ms.mentorId?.toString ? ms.mentorId.toString() : String(ms.mentorId);
      const mId = mentorId?.toString ? mentorId.toString() : String(mentorId);
      return msId === mId;
    }
  );
  if (mentorStatus) {
    mentorStatus.meetingDate = meetingDate;
    mentorStatus.meetingTime = meetingTime;
    mentorStatus.meetingScheduledAt = new Date();
    // Mark the path as modified to ensure Mongoose saves the changes
    this.markModified('mentorStatuses');
  } else {
    throw new Error('Mentor status not found. Please accept the application first.');
  }
  return this.save();
};

export default mongoose.models.MentorApplication || mongoose.model('MentorApplication', MentorApplicationSchema);

