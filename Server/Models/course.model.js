const mongoose = require('mongoose');
const FKHelper = require('./Helpers/foreignKey.helper.js');

const CourseSchema = mongoose.Schema({
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
        enum: [100, 200, 300, 400, 500, 600],
        default: 100,
        required: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model('Department'), v);
            },
            message: 'Department Doesnt exist'
        },
        required: true
    },
    departmentName: {
        type: String
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model('Faculty'), v);
            },
            message: 'Faculty Doesnt exist'
        },
        required: true
    },
    facultyName: {
        type: String
    },
    maxLectureGroups: {
        type: String,
        default: "1"
    },
    maxLabGrouops: {
        type: String,
        default: "N/A"
    },
    semester: {
        type: String,
        enum: ['First', 'Second'],
        required: true
    }
});

const Course = module.exports = mongoose.model('Course', CourseSchema);
/* 
module.exports.getCourseById = (id, callback) => {
    Course.findById(id, callback);
}

module.exports.getCourseByCode = (courseCode, callback) => {
    const query = { courseCode: courseCode }

    Course.findOne(query, callback);
} */