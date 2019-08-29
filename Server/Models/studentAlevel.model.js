const mongoose = require('mongoose');
const FKHelper = require('./Helpers/foreignKey.helper.js');

const AlevelSchema = mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        validate: {
            isAsync: true,
            validator: function(v) {
                return FKHelper(mongoose.model('Student'), v);
            },
            message: 'student Doesnt exist'
        },
    },
    studentRegNo: {
        type: String,
        required: true,
        unique: true
    },
    instituition: {
        type: String,
        required: true
    },
    courseOfStudy: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    resultType: {
        type: String,
        enum: ["Distinction", "Merit", "Pass", "Fail", "Not Specified"],
        default: "Not Specified"
    }
});

const Alevel = module.exports = mongoose.model('Alevel', AlevelSchema);