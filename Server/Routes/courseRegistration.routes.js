const express = require('express');
const router = express.Router();

const CourseRegistration = require('../Models/courseRegistration.model');

let objectId = require('mongoose').Types.ObjectId;

// register course by studentId
router.post('/addcourse/:studentId', (req, res, next) => {

    if(!objectId.isValid(req.params.studentId)) return res.status(400).send(`Invalid ID ${req.params.studentId}`);

    let newCourseReg = new CourseRegistration({
        studentId: req.params.studentId,
        studentRegNo: req.body.studentRegNo,
        studentfullname: req.body.studentfullname,
        studentLevel: req.body.studentLevel,
        courseId: req.body.courseId,
        courseCode: req.body.courseCode,
        courseTitle: req.body.courseTitle,
        creditUnits: req.body.creditUnits,
        courseLevel: req.body.courseLevel,
        lectureGroup: req.body.lectureGroup,
        labGroup: req.body.labGroup,
        session: req.body.session,
        semester: req.body.semester
    });
    newCourseReg.save((err, doc) => {
        if(!err){
            res.json({success: true, msg: 'courses registered', data: doc});
        } 
        else{
            res.json({success: false, msg: 'Failed to register courses', error: err});
        } 
    }); 
});

// drop a course by studentId and courseId
router.delete('/dropcoursebystudentidandcourseid/:courseId/:studentId', (req, res, next) => {

    if(!objectId.isValid(req.params.studentId)) return res.status(400).send(`Invalid ID ${req.params.studentId}`);

    if(!objectId.isValid(req.params.courseId)) return res.status(400).send(`Invalid ID ${req.params.courseId}`);

    const query = { courseId: req.params.courseId, studentId: req.params.studentId };

    CourseRegistration.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'course dropped successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid course id... course not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to drop course', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// drop a course by studentId and courseCode
router.delete('/dropcoursebystudentidandcoursecode/:courseCode/:studentId', (req, res, next) => {

    if(!objectId.isValid(req.params.studentId)) return res.status(400).send(`Invalid ID ${req.params.studentId}`);

    const query = { courseCode: req.params.courseCode, studentId: req.params.studentId };

    CourseRegistration.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'course dropped successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid course code... course not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to drop course', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// drop course by studentRegNo and courseCode
router.delete('/dropcoursebystudentregnoandcoursecode/:courseCode/:studentRegNo', (req, res, next) => {

    const query = { courseCode: req.params.courseCode, studentRegNo: req.params.studentRegNo };

    CourseRegistration.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'course dropped successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid course code... course not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to drop course', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// get registered courses by studentId
router.get('/getregisteredcoursesbystudentid/:studentId', (req, res, next) => {

    if(!objectId.isValid(req.params.studentId)) return res.status(400).send(`Invalid ID ${req.params.studentId}`);

    const query = { studentId: req.params.studentId };

    CourseRegistration.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'no courses registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch courses', error: err});
        };
    });    
});

//get registered courses by studentRegNo
router.get('/getregisteredcoursesbystudenregno/:studentRegNo', (req, res, next) => {

    const query = { studentRegNo: req.params.studentRegNo };

    CourseRegistration.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'no courses registered', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch courses', error: err});
        };
    });    
});

// get all students registered to a course by courseId
router.get('/getstudentsbycourseid/:courseId', (req, res, next) => {

    if(!objectId.isValid(req.params.courseId)) return res.status(400).send(`Invalid ID ${req.params.courseId}`);

    const query = { courseId: req.params.courseId };

    CourseRegistration.find(query, (err, doc) => {

        let students = [];

        if (!err && doc.length > 0) {

            for(i = 0; i < doc.length; i++){
                students.push({ 
                    studentRegNo: doc[i].studentRegNo,
                    studentfullname: doc[i].studentfullname,
                    studentLevel: doc[i].studentLevel
                });
            }
            res.json({success: true, data: students});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'no students registered the course', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch courses', error: err});
        }
    });

});

// get all students registered to a course by courseCode
router.get('/getstudentsbycoursecode/:courseCode', (req, res, next) => {

    const query = { courseCode: req.params.courseCode };

    CourseRegistration.find(query, (err, doc) => {

        let students = [];

        if (!err && doc.length > 0) {

            for(i = 0; i < doc.length; i++){
                students.push({ 
                    studentRegNo: doc[i].studentRegNo,
                    studentfullname: doc[i].studentfullname,
                    studentLevel: doc[i].studentLevel
                });
            }
            res.json({success: true, data: students});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'no student registered the course', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch courses', error: err});
        }
    });

});

module.exports = router;
