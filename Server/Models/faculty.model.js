const mongoose = require('mongoose');

const FacultySchema = mongoose.Schema({
    facultyName: {
        type: String,
        required: 'Faculty is required',
        unique: 'Faculty Name is unique'
    }
});

//delete mongoose.connection.models['Faculty'];

const Faculty = module.exports = mongoose.model('Faculty', FacultySchema);