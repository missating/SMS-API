import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String },
  phoneNumber: { type: String, unique: true, required: true },
  sms: { type: [mongoose.Schema.Types.ObjectId], ref: 'Sms' }
});

export default mongoose.model('Contact', contactSchema);
