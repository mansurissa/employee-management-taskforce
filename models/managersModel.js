import mongoose from 'mongoose';

const loginSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  nId: { type: Number, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  position: { type: String, default: 'manager', required: true },
  dateOfBirth: { type: String, required: true },
  status: { type: String, required: true, default: 'active' },
});

export default mongoose.model('Managers', loginSchema);
