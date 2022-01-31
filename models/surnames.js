const mongoose = require('mongoose');

const surnameSchema = new mongoose.Schema({
    snaNumber : {
        type : String,
        required: true
    },
    snaName : {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Surname', surnameSchema);