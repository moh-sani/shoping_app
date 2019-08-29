const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../Config/db');

const SuperAdminSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'Superadmin'
    }
});

delete mongoose.connection.models['SuperAdmin'];

const SuperAdmin = module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);

module.exports.getSuperAdminById = (id, callback) => {
    SuperAdmin.findById(id, callback);
}

module.exports.getSuperAdminByUsername = (username, callback) => {
    const query = { username: username };
    SuperAdmin.findOne(query, callback);
}

module.exports.addSuperAdmin = (newSuperAdmin, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSuperAdmin.password, salt, (err, hash) => {
            if(err) throw err;

            newSuperAdmin.password = hash;
            newSuperAdmin.save(callback);
        });
    });
} 

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}