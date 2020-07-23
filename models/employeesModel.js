import mongoose from 'mongoose';

const employeesSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  birth: { type: String, required: true },
  nId: { type: Number, required: true, unique: true },
  status: { type: String, required: true },
  position: { type: String, required: true },

  phone: { type: Number, required: true, unique: true },

});

export default mongoose.model('Employees', employeesSchema);
