import mongoose from 'mongoose';

const recordingSchema = new mongoose.Schema({
  transcription: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Recording = mongoose.model('Recording', recordingSchema);

export default Recording;
