import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String },
  phoneNumber:{ type: Number, unique: true, required: true },
  sms: { type: [mongoose.Schema.Types.ObjectId], ref: sms}
});

export default mongoose.model('Contact', contactSchema);
