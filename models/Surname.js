import mongoose from 'mongoose';

const surnameSchema = new mongoose.Schema({
  snaNumber: {
    type: String,
    required: true
  },
  snaName: {
    type: String,
    required: true
  }
});

const Surname = mongoose.model('Surname', surnameSchema);

export default Surname;
