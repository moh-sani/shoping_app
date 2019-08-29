const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const FKHelper = require('./Helpers/foreignKey.helper.js')
const config = require('../Config/db');

const StudentSchema = mongoose.Schema({
    
    jambNumber: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    regNo:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    otherNames: {
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
    level: {
        type: Number,
        required: true
    },
    departmentName: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        default: "Male",
        required: true
    },
    maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Engaged", "Not Specified"],
        default: "Not Specified",
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    placeOfBirth: {
        type: String,
        default: "Not updated"
    },
    homeTown: {
        type: String,
        default: "Not updated"
    },
    stateOfOrigin: {
        type: String,
        required: true
    },
    localGovtArea: {
        type: String,
        default: "Not updated"
    },
    nationality: {
        type: String,
        required: true
    },
    contactAddress: {
        type: String,
        default: "Not updated"
    },
    email: {
        type: String,
        default: "Not updated"
    },
    homeAddress: {
        type: String,
        default: "Not updated"
    },
    phone: {
        type: String,
        default: "Not updated"
    },
    nextOfKin: {
        type: String,
        default: "Not updated"
    },
    nextOfKinAddress: {
        type: String,
        default: "Not updated"
    },
    nextOfKinTelephone: {
        type: String,
        default: "Not updated"
    },
    healthRecord: {
        bloodGroup: {
            type: String,
            enum: ["A", "B", "AB", "O", "Not Selected"],
            default: "Not Selected"
        },
        genotype: {
            type: String,
            enum: ["AA", "AS", "SS", "Not Selected"],
            default: "Not Selected"
        },
        disablilities: {
            type: String,
            default: "None"
        }
    },
    religion: {
        type: String,
        enum: ["Islam", "Christainity", "Not Selected"],
        default: "Not Selected"
    },
    nationalId: {
        type: String,
        default: "Not updated"
    },
   /*  signature: {
        type: Image,
    }, */
    sponsor: {
        type: String,
        default: "Not updated"
    },
    otherSponsor: {
        type: String,
        default: "Not updated"
    },/*
    image: {
        type: Image,
    }, */
    sport: {
        type: String,
        default: "Not updated"
    },
    role: {
        type: String,
        default: 'Student'
    }
});

delete mongoose.connection.models['Student'];

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentById = (id, callback) => {
    Student.findById(id, callback);
}

module.exports.getStudentByRegistrationNumber = (regNo, callback) => {
    const query = { regNo: regNo };
    Student.findOne(query, callback);
}

module.exports.addStudent = (newStudent, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
            if(err) throw err;

            newStudent.password = hash;
            newStudent.save(callback);
        });
    });
} 

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}