const mongoose = require('mongoose');
const FKHelper = require('./Helpers/foreignKey.helper.js');

const AssignCourseSchema = mongoose.Schema({

    lecturerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model('Lecturer'), v);
            },
            message: 'Lecturer Doesnt exist'
        },
    },
    lecturerRegNo: {
        type: String,
        required: true
    },
    lecturerfullname: {
        type: String,
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
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    semster: {
        type: String,
        required: true
    }
});

const AssignCourse = module.exports = mongoose.model('AssignCourse', AssignCourseSchema)