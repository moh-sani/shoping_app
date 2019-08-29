const express = require('express');
const router = express.Router();
const config = require('../Config/db');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

let objectId = require('mongoose').Types.ObjectId;

const SuperAdmin = require('../Models/superAdmin.model');

// Register new admin
router.post('/register', (req, res, next) => {
    
    let newSuperAdmin = new SuperAdmin(req.body);

    SuperAdmin.addSuperAdmin(newSuperAdmin, (err, superAdmin) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to register user', error: err });
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// login authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    SuperAdmin.getSuperAdminByUsername(username, (err, superAdmin) => {

        if(err) throw err;

        if(!superAdmin) {
            return res.json({success: false, msg: 'User not found'});
        }

        SuperAdmin.comparePassword(password, superAdmin.password, (err, isMatch) => {
            
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign(JSON.parse(JSON.stringify(superAdmin)), config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    superAdmin: {
                        id: superAdmin._id,
                        fullname: superAdmin.fullname,
                        username: superAdmin.username,
                        email: superAdmin.email
                    }

                });
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }

        });
    });
});

// update by _id
router.put('/updatebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    let superadmin = req.body;

    SuperAdmin.findByIdAndUpdate(req.params.id, { $set: superadmin }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'superadmin updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({success: true, msg: 'invalid id or superadmin with id not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update superadmin', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update by username
router.put('/updatebyusername/:username', (req, res, next) => {

    let superadmin = req.body;

    const query = { username: req.params.username };

    SuperAdmin.findOneAndUpdate(query, { $set: superadmin }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'superadmin updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({success: true, msg: 'invalid username... or superadmin not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update superadmin', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// change password by username
router.put('/changepassword/:username', (req, res, next) => {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    SuperAdmin.getSuperAdminByUsername(req.params.username, (err, superadmin) => {

        if(err) throw err;

        if(!superadmin) {
            return res.json({success: false, msg: 'Superadmin not found'});
        }

        SuperAdmin.comparePassword(oldPassword, superadmin.password, (err, isMatch) => {
            
            if(err) throw err;

            if(isMatch) {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if(err) throw err;
                        
                       let newSuperadmin = { password: hash };

                        const query = { username: req.params.username };

                        SuperAdmin.findOneAndUpdate(query, { $set: newSuperadmin }, { new: true }, (err, doc) => {
                            
                            if(!err && doc != null) {
                                res.json({ success: true, msg: 'password changed successfully', data: doc});
                            }
                            else if(doc == null){
                                res.json({success: true, msg: 'invalid username... or superadmin not registered', data: doc});
                            }
                            else {
                                res.json({success: false, msg: 'failed to update superadmin', error: err});
                                console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
                            }
                        });
                    });
                });

            } else {
                return res.json({success: false, msg: 'wrong password'});
            }

        });
    });
});

// remove superadmin by _id
router.delete('/removebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    SuperAdmin.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'superadmin deleted successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid id... or superadmin not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update superadmin', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// remove by username
router.delete('/removebyusername/:username', (req, res, next) => {

    const query = { username: req.params.username};

    SuperAdmin.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'superadmin deleted successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid username... or superadmin not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update lecturer', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// get profile
router.get('/profilebyid/:id', (req, res, next) => {
    
    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    SuperAdmin.findById(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'superadmin fethced successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid username... or superadmin not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update lecturer', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// get profile by username
router.get('/profilebyusername/:username', (req, res, next) => {
    
    const query = { username: req.params.username };

    SuperAdmin.findOne(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'superadmin fethced successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid username... or superadmin not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update lecturer', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});
module.exports = router;