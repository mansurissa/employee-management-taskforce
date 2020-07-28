import mongoose from 'mongoose';

const employeesSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  birth: {
    type: String,
    required: true,
    match: /^((0)?([1-9]|(1|2)[0-9]|(3[0-1])))\/((0)?([1-9])|(1[0-2]))\/((1|2)[0-9]{3})$/,
  },
  nId: { type: String, required: true, unique: true, match: /^1(\d){15}$/ },
  status: { type: String, default: 'active', match: /^(in)?(active)$/ },
  position: { type: String, required: true },
  suspended: { type: Boolean, default: false },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^(\+)?(25)?(07)(2|3|8)(\d){7}$/,
  },
  image: { type: String },
});

export default mongoose.model('Employees', employeesSchema);
