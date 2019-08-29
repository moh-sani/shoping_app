const mongoose = require('mongoose');
const FKHelper = require('./Helpers/foreignKey.helper.js');

const CourseRegistrationSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model('Student'), v);
            },
            message: 'Student Doesnt exist'
        },
    },
    studentRegNo: {
        type: String,
        required: true,
        unique: true
    },
    studentfullname: {
        type: String,
        required: true
    },
    studentLevel: {
        type: Number,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model('Course'), v);
            },
            message: 'Course Doesnt exist'
        },
    },
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    creditUnits: {
        type: Number,
        required: true
    },
    courseLevel: {
        type: Number,
        required: true
    },
    lectureGroup: {
        type: String,
        default: 'N/A'
    },
    labGroup: {
        type: String,
        default: 'N/A'
    },
    session: {
        type: String,
    },
    semester: {
        type: String,
        required: true
    }
});

const CourseRegistration = module.exports = mongoose.model('CourseRegistration', CourseRegistrationSchema);