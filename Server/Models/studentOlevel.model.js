const mongoose = require('mongoose');
const FKHelper = require('./Helpers/foreignKey.helper.js');

const OlevelSchema = mongoose.Schema({

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
    },
    examType: {
        type: String,
        enum: ["WASSCE", "NECO", "NABTEB", "Others"],
        required: true
    },
    courses: [{
        type: String,
        requred: true
    }],
    grades: [{
        type: String,
        required: true
    }]
});

const Olevel = module.exports = mongoose.model('Olevel', OlevelSchema);