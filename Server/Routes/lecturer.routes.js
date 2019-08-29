const express = require('express');
const router = express.Router();
const config = require('../Config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

let objectId = require('mongoose').Types.ObjectId;

const Lecturer = require('../Models/lecturer.model');

// register lecturer
router.post('/register', (req, res, next) => {

    let newLecturer = new Lecturer(req.body);

    Lecturer.addLecturer(newLecturer, (err, lecturer) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to register lecturer', error: err});
        } else {
            res.json({success: true, msg: 'Lecturer registered', data: lecturer});
        }
    });
});

// login authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    Lecturer.getLecturerByRegistrationNumber(username, (err, lecturer) => {

        if(err) throw err;

        if(!lecturer) {
            return res.json({success: false, msg: 'Lecturer not found'});
        }

        Lecturer.comparePassword(password, lecturer.password, (err, isMatch) => {
            
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign(JSON.parse(JSON.stringify(lecturer)), config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    lecturer: lecturer
                });
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }

        });
    });
});

// get all lecturers
router.get('/', (req, res, next) => {

    Lecturer.find((err, doc) => {
        if (!err) {
            res.json({ success: true, msg: 'lecturers fetched successfully', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to get lecturers', error: err});
            console.log('Error getting lecturers List ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// get lecturer by _id
router.get('/getbyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)){
        return res.status(400).send(`Invalid ID ${req.params.id}`)
    }

    Lecturer.findById(req.params.id, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null) {
            res.json({ success: true, msg: 'ID doesnt exist as a lecturer', data: doc})
        }
        else {
            res.json({success: false, msg: 'Failed to fetch lecturer', error: err});
        };
    });
});

// get lecturer by regNo
router.get('/getbyregno/:regNo', (req, res, next) => {

    const query = { regNo: req.params.regNo }
    Lecturer.findOne(query, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null) {
            res.json({ success: true, msg: 'regno doesnt exist as a lecturer', data:doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch lecturer', error: err});
        };
    });
});

// get lecturers by facultyId
router.get('/getbyfacultyid/:facultyId', (req, res, next) => {

    if(!objectId.isValid(req.params.facultyId)){
        return res.status(400).send(`Invalid ID ${req.params.facultyId}`)
    }
    const query = { facultyId: req.params.facultyId };

    Lecturer.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'facultyid doesnt exist as a faculty or no lecturers registered to the faculty', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch lecturers', error: err});
        };
    });
});

// get lecturers by facultyName
router.get('/getbyfacultyName/:facultyName', (req, res, next) => {

    const query = { facultyName: req.params.facultyName };

    Lecturer.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'facultyName doesnt exist as a faculty or no lecturer registered to the faculty', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch lecturer', error: err});
        };
    });
});

// get lecturers by departmentId
router.get('/getbydepartmentid/:departmentId', (req, res, next) => {

    if(!objectId.isValid(req.params.departmentId)){
        return res.status(400).send(`Invalid ID ${req.params.departmentId}`)
    }
    const query = { departmentId: req.params.departmentId };

    Lecturer.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'departmentId doesnt exist as a department or no lecturers registered to the department', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch lecturers', error: err});
        };
    });
});

// get lecturers by departmentName
router.get('/getbydepartmentname/:departmentName', (req, res, next) => {

    const query = { departmentName: req.params.departmentName };

    Lecturer.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'departmentName doesnt exist as a department or no lecturers registered to the department', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch lecturers', error: err});
        };
    });
});

// update lecturer by _id
router.put('/updatebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    let lecturer = req.body;

    Lecturer.findByIdAndUpdate(req.params.id, { $set: lecturer }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'lecturer updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({success: true, msg: 'invalid id', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update lecturer', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update lecturer by regNo
router.put('/updatebyregno/:regNo', (req, res, next) => {

    let lecturer = req.body;

    const query = { regNo: req.params.regNo };

    Lecturer.findOneAndUpdate(query, { $set: lecturer }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'lecturer updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({success: true, msg: 'invalid registration number... or lecturer not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update lecturer', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// change password by regNo
router.put('/changepassword/:regNo', (req, res, next) => {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    Lecturer.getLecturerByRegistrationNumber(req.params.regNo, (err, lecturer) => {

        if(err) throw err;

        if(!lecturer) {
            return res.json({success: false, msg: 'Lecturer not found'});
        }

        Lecturer.comparePassword(oldPassword, lecturer.password, (err, isMatch) => {
            
            if(err) throw err;

            if(isMatch) {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if(err) throw err;
                        
                       let newLecturer = { password: hash };

                        const query = { regNo: req.params.regNo };

                        Lecturer.findOneAndUpdate(query, { $set: newLecturer }, { new: true }, (err, doc) => {
                            
                            if(!err && doc != null) {
                                res.json({ success: true, msg: 'password changed successfully', data: doc});
                            }
                            else if(doc == null){
                                res.json({success: true, msg: 'invalid registration number... or lecturer not registered', data: doc});
                            }
                            else {
                                res.json({success: false, msg: 'failed to update lecturer', error: err});
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

// remove lecturer by _id
router.delete('/removebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    Lecturer.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'lecturer deleted successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid id... or lecturer not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update lecturer', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// remove lecturer by regNo
router.delete('/removebyregno/:regNo', (req, res, next) => {

    const query = { regNo: req.params.regNo};

    Lecturer.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'lecturer deleted successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid registration number... or lecturer not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update lecturer', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;