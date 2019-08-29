const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const FKHelper = require('./Helpers/foreignKey.helper.js');

const LecturerSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    othernames: {
        type: String,
        default: "N/A"
    },
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    stateOfOrigin: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        default: "Not updated"
    },
    address: {
        type: String,
        default: 'Not provided... Please upadate'
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
    role: {
        type: String,
        default: 'Lecturer'
    }/* ,
    image: {
        type: Image,
    },
    signature: {
        type: Image
    } */
});

const Lecturer = module.exports = mongoose.model('Lecturer', LecturerSchema);

module.exports.getLecturerById = (id, callback) => {
    Lecturer.findById(id, callback);
}

module.exports.getLecturerByRegistrationNumber = (regNo, callback) => {
    const query = { regNo: regNo };
    Lecturer.findOne(query, callback);
}

module.exports.addLecturer = (newLecturer, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newLecturer.password, salt, (err, hash) => {
            if(err) throw err;

            newLecturer.password = hash;
            newLecturer.save(callback);
        });
    });
} 

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}