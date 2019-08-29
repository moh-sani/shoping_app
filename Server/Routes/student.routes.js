const express = require('express');
const router = express.Router();
const config = require('../Config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

let objectId = require('mongoose').Types.ObjectId;

const Student = require('../Models/student.model');

// register a student
router.post('/register', (req, res, next) => {

    let newStudent = new Student(req.body);

    Student.addStudent(newStudent, (err, student) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to register student', error: err});
        } else {
            res.json({success: true, msg: 'Student registered', data: student});
        }
    });
});

// login authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    Student.getStudentByRegistrationNumber(username, (err, student) => {

        if(err) throw err;

        if(!student) {
            return res.json({success: false, msg: 'Student not found'});
        }

        Student.comparePassword(password, student.password, (err, isMatch) => {
            
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign(JSON.parse(JSON.stringify(student)), config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    student: student
                });
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }

        });
    });
});

// fetch all students
router.get('/', (req, res, next) => {

    Student.find((err, doc) => {
        if (!err) {
            res.json({ success: true, msg: 'students fetched successfully', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to get students', error: err});
            console.log('Error getting Students List ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// get student by _id
router.get('/get-by-id/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)){
        return res.status(400).send(`Invalid ID ${req.params.id}`)
    }

    Student.findById(req.params.id, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null) {
            res.json({ success: true, msg: 'ID doesnt exist as a student', data: doc})
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Student', error: err});
        };
    });
});

// get student by regNo
router.get('/get-by-regno/:regNo', (req, res, next) => {

    const query = { regNo: req.params.regNo }
    Student.findOne(query, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null) {
            res.json({ success: true, msg: 'regno doesnt exist as a student', data:doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Student', error: err});
        };
    });
});

// get students by facultyId
router.get('/get-by-faculty-id/:facultyId', (req, res, next) => {

    if(!objectId.isValid(req.params.facultyId)){
        return res.status(400).send(`Invalid ID ${req.params.facultyId}`)
    }
    const query = { facultyId: req.params.facultyId };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'facultyid doesnt exist as a faculty or no students registered to the faculty', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by facultyName
router.get('/getbyfacultyName/:facultyName', (req, res, next) => {

    const query = { facultyName: req.params.facultyName };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'facultyName doesnt exist as a faculty or no students registered to the faculty', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by departmentId
router.get('/getbydepartmentid/:departmentId', (req, res, next) => {

    if(!objectId.isValid(req.params.departmentId)){
        return res.status(400).send(`Invalid ID ${req.params.departmentId}`)
    }
    const query = { departmentId: req.params.departmentId };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'departmentId doesnt exist as a department or no students registered to the department', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by departmentName
router.get('/getbydepartmentname/:departmentName', (req, res, next) => {

    const query = { departmentName: req.params.departmentName };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'departmentName doesnt exist as a department or no students registered to the department', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by level
router.get('/getbylevel/:level', (req, res, next) => {

    const query = { level: req.params.level };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'level doesnt exist in the department or no students in the level', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by departmentId and level
router.get('/getbydepartmentidandlevel/:departmentId/:level', (req, res, next) => {

    if(!objectId.isValid(req.params.departmentId)){
        return res.status(400).send(`Invalid ID ${req.params.departmentId}`)
    }
    const query = { departmentId: req.params.departmentId, level: req.params.level };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'no students in the selected level are in this department', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by departmentName and level
router.get('/getbydepartmentnameandlevel/:departmentName/:level', (req, res, next) => {

    const query = { departmentName: req.params.departmentName, level: req.params.level };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'no students in the selected level are in this department', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by facultyId and level
router.get('/getbyfacultyidandlevel/:facultyId/:level', (req, res, next) => {

    if(!objectId.isValid(req.params.facultyId)){
        return res.status(400).send(`Invalid ID ${req.params.facultyId}`)
    }
    const query = { facultyId: req.params.facultyId, level: req.params.level };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'no students in the selected level are in this faculty', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// get students by facultyName and level
router.get('/getbyfacultynameandlevel/:facultyName/:level', (req, res, next) => {

    const query = { facultyName: req.params.facultyName, level: req.params.level };

    Student.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0) {
            res.json({ success: true, msg: 'no students in the selected level are in this faculty', data: doc})
        } 
        else {
            res.json({success: false, msg: 'Failed to fetch Students', error: err});
        };
    });
});

// update student by _id
router.put('/updatebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    let student = req.body;

    Student.findByIdAndUpdate(req.params.id, { $set: student }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'student updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({success: true, msg: 'invalid id... student doesnt exist', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update student', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update student by regNo
router.put('/updatebyregno/:regNo', (req, res, next) => {

    let student = req.body;

    const query = { regNo: req.params.regNo };

    Student.findOneAndUpdate(query, { $set: student }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'student updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({success: true, msg: 'invalid registration number... or student not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update student', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// change password by regNo
router.put('/changepassword/:regNo', (req, res, next) => {

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    Student.getStudentByRegistrationNumber(req.params.regNo, (err, student) => {

        if(err) throw err;

        if(!student) {
            return res.json({success: false, msg: 'Student not found'});
        }

        Student.comparePassword(oldPassword, student.password, (err, isMatch) => {
            
            if(err) throw err;

            if(isMatch) {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if(err) throw err;
                        
                       let newStudent = { password: hash };

                        const query = { regNo: req.params.regNo };

                        Student.findOneAndUpdate(query, { $set: newStudent }, { new: true }, (err, doc) => {
                            
                            if(!err && doc != null) {
                                res.json({ success: true, msg: 'password changed successfully', data: doc});
                            }
                            else if(doc == null){
                                res.json({success: true, msg: 'invalid registration number... or student not registered', data: doc});
                            }
                            else {
                                res.json({success: false, msg: 'failed to update student', error: err});
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

// remove student by _id
router.delete('/removebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    Student.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'student deleted successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid id... or student not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update student', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// remove student by regNo
router.delete('/removebyregno/:regNo', (req, res, next) => {

    const query = { regNo: req.params.regNo};

    Student.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'student deleted successfully', data: doc});
        }
        else if(doc == null) {
            res.json({success: true, msg: 'invalid registration number... or student not registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to update student', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;