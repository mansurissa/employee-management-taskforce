import mongoose from 'mongoose';

const loginSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  nId: { type: String, required: true, unique: true, match: /^1(\d){15}$/ },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^(\+)?(25)?(07)(2|3|8)(\d){7}$/,
  },
  password: {
    type: String,
    required: true,
  },
  position: { type: String, default: 'manager', required: true },
  dateOfBirth: {
    type: String,
    required: true,
    match: /^((0)?([1-9]|(1|2)[0-9]|(3[0-1])))\/((0)?([1-9])|(1[0-2]))\/((1|2)[0-9]{3})$/,
  },
  status: {
    type: String,
    required: true,
    default: 'active',
    match: /^(in)?(active)$/,
  },
  verified: { type: Boolean, default: false },
});

export default mongoose.model('Managers', loginSchema);
