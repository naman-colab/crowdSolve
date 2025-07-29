import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // If you want to link to the User who created it
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Problem', problemSchema);
