import mongoose from 'mongoose';

const smsSchema = new mongoose.Schema({
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  message: { type: String, required: true },
  senderNumber: { type: String, required: true },
  receiverNumber: { type: String, required: true }
});

export default mongoose.model('Sms', smsSchema);
