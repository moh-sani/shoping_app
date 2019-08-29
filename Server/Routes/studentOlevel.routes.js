const express = require('express');
const router = express.Router();

let objectId = require('mongoose').Types.ObjectId;

const StudentOlevel = require('../Models/studentOlevel.model');

// post Olevel results by studentId
router.post('/post/:studentId', (req, res, next) => {

    if(!objectId.isValid(req.params.studentId)) {
        return res.status(400).send(`Invalid ID ${req.params.studentId}`);
    };

    let newStudentOlevel = new StudentOlevel({
        studentId: req.params.studentId,
        studentRegNo: req.body.studentRegNo,
        examType: req.body.examType,
        courses: req.body.courses,
        grades: req.body.grades
    });

    newStudentOlevel.save((err, doc) => {
        if(!err){
            res.json({success: true, msg: 'results posted', data: doc});
        } 
        else{
            res.json({success: false, msg: 'Failed to post results', error: err});
        } 
    }); 
});

//  get olevel results by studentId
router.get('/getbystudentid/:studentId', (req, res, next) => {

    if(!objectId.isValid(req.params.studentId)) return res.status(400).send(`Invalid ID ${req.params.studentId}`);

    const query = { studentId: req.params.studentId };

    StudentOlevel.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'results not posted', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Departments', error: err});
        };
    });
});

// get olevel results by studentRegNo
router.get('/getbystudentregno/:studentRegNo', (req, res, next) => {

    const query = { studentRegNo: req.params.studentRegNo };

    StudentOlevel.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'results not posted', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Departments', error: err});
        };
    });   
});

// update student oLevel by _id
router.put('/update/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    let olevel = req.body;

    StudentOlevel.findByIdAndUpdate(req.params.id, { $set: olevel }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'results updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid id... result not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update results', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// remove olevel results by _id
router.delete('/remove/:id', (req, res, next) => {
   
    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    StudentOlevel.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'results deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid result id... result not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update result', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;