const mongoose = require('mongoose');
//const Faculty = require('./faculty.model');
const FKHelper = require('./Helpers/foreignKey.helper');

const DepartmentSchema = mongoose.Schema({
    departmentName: {
        type: String,
        required: 'Department name is required',
        unique: 'Department name is a unique field'
    },
    departmentCode: {
        type: String,
        required: 'department code is required',
        unique: 'department code is unique'
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
    duration: {
        type: Number,
        enum: [4, 5, 6],
        default: 4
    }
});

const Department = module.exports = mongoose.model('Department', DepartmentSchema);

/* module.exports.getDepartmentByName = (departmentName, callback) => {
    const query = { departmentName: departmentName };

    Department.findOne(query, callback);
}

module.exports.getDepartmentByCode = (departmentCode, callback) => {
    const query = { departmentCode: departmentCode };

    Department.findOne(query, callback);
}

module.exports.getDepartmentById = (id, callback) => {
    Department.findById(id, callback);
} */

