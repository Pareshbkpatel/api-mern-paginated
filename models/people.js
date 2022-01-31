const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    last_name : {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Person', personSchema);