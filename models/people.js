import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  last_name: {
    type: String,
    required: true
  }
});

const Person = mongoose.model('Person', personSchema);

export default Person;
