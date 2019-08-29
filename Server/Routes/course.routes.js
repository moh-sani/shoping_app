const express = require('express');
const router = express.Router();

const Course = require('../Models/course.model');

let objectId = require('mongoose').Types.ObjectId;


// create a course
router.post('/create', (req, res, next) => {

    let newCourse = new Course(req.body);

    newCourse.save((err, doc) => {
        if(!err){
            res.json({success: true, msg: 'course created', data: doc});
        } 
        else{
            res.json({success: false, msg: 'Failed to create course', error: err});
        } 
    });
});

// get a course by _id
router.get('/getbyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) {
        return res.status(400).send(`Invalid ID ${req.params.id}`)
    };

    Course.findById(req.params.id, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null){
            res.json({ success: true, msg: 'Course doesnt exist... ID doesnt exist as a Course', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Course', error: err});
        };
    });
});

// get a course by courseCode
router.get('/getbycode/:courseCode', (req, res, next) => {

    const query = { courseCode: req.params.courseCode }
    Course.findOne(query, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null){
            res.json({ success: true, msg: 'Course doesnt exist... invalid Course code', data: doc });
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Course', error: err});
        };
    });
});

//get courses by creditUnits
router.get('/getbycreditunits/:creditUnits', (req, res, next) => {

    const query = { creditUnits: req.params.creditUnits }
    Course.find(query, (err, doc) => {

        if (!err && doc.lenght > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc == 0){
            res.json({ success: true, msg: 'Course doesnt exist... invalid unit', data: doc });
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by level
router.get('/getbycourselevel/:courseLevel', (req, res, next) => {

    const query = { courseLevel: req.params.courseLevel }
    Course.find(query, (err, doc) => {

        if (!err && doc.lenght > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc == 0){
            res.json({ success: true, msg: 'Course doesnt exist... invalid unit', data: doc });
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by facultyId
router.get('/getbyfacultyid/:facultyId', (req, res, next) => {

    if(!objectId.isValid(req.params.facultyId)) return res.status(400).send(`Invalid ID ${req.params.facultyId}`);

    const query = { facultyId: req.params.facultyId };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'faculty doesnt exist... id doesnt exist as a faculty', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by facultyName
router.get('/getbyfacultyname/:facultyName', (req, res, next) => {

    const query = { facultyName: req.params.facultyName };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'faculty doesnt exist... invalid faculty name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by departmentId
router.get('/getbydepartmentid/:departmentId', (req, res, next) => {

    if(!objectId.isValid(req.params.departmentId)) return res.status(400).send(`Invalid ID ${req.params.departmentId}`);

    const query = { departmentId: req.params.departmentId };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'department doesnt exist... id doesnt exist as a department', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by departmentName
router.get('/getbydepartmentname/:departmentName', (req, res, next) => {

    const query = { departmentName: req.params.departmentName };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'department doesnt exist... invalid department name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by semester
router.get('/getbysemester/:semester', (req, res, next) => {

    const query = { semester: req.params.semester };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'semester doesnt exist... invalid semester name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by departmentId and level
router.get('/getbydepartmentidandlevel/:departmentId/:courseLevel', (req, res, next) => {

    if(!objectId.isValid(req.params.departmentId)) return res.status(400).send(`Invalid ID ${req.params.departmentId}`);

    const query = { departmentId: req.params.departmentId, courseLevel: req.params.courseLevel };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'department or level doesnt exist... id doesnt exist as a department', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by departmentName and level
router.get('/getbydepartmentnameandlevel/:departmentName/:courseLevel', (req, res, next) => {

    const query = { departmentName: req.params.departmentName, courseLevel: req.params.courseLevel };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'department or level doesnt exist... invalid department name or level', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by semester and level
router.get('/getbysemesterandlevel/:semester/:courseLevel', (req, res, next) => {

    const query = { semester: req.params.semester, courseLevel: req.params.courseLevel };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'semester or level doesnt exist... invalid semester name or level', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get by departmentId and semester
router.get('/getbydepartmentidandsemester/:departmentId/:semester', (req, res, next) => {

    if(!objectId.isValid(req.params.departmentId)) return res.status(400).send(`Invalid ID ${req.params.departmentId}`);

    const query = { semester: req.params.semester, departmentId: req.params.departmentId };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'semester or department  doesnt exist... invalid semester name or department id', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by departmentName and semester
router.get('/getbydepartmentnameandsemester/:departmentName/:semester', (req, res, next) => {

    const query = { semester: req.params.semester, departmentName: req.params.departmentName };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'semester or department doesnt exist... invalid semester name or department name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by departmentId, semester and level
router.get('/getbydepartmentidsemesterandlevel/:departmentId/:semester/:courseLevel', (req, res, next) => {

    if(!objectId.isValid(req.params.departmentId)) return res.status(400).send(`Invalid ID ${req.params.departmentId}`);

    const query = { semester: req.params.semester, departmentId: req.params.departmentId, courseLevel: req.params.courseLevel };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'semester or department  doesnt exist... invalid semester name or department id', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// get courses by departmentName, semester and level
router.get('/getbydepartmentnamesemesterandlevel/:departmentName/:semester/:courseLevel', (req, res, next) => {

    const query = { semester: req.params.semester, departmentName: req.params.departmentName, courseLevel: req.params.courseLevel };

    Course.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'semester or department doesnt exist... invalid semester name or department name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Courses', error: err});
        };
    });
});

// update a course by _id
router.put('/updatebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    let course = req.body;

    Course.findByIdAndUpdate(req.params.id, { $set: course }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'course updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid course id... course not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update course', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update a course by courseCode
router.put('/updatebycode/:courseCode', (req, res, next) => {

    let course = req.body;

    const query = { courseCode: req.params.courseCode };

    Course.findOneAndUpdate(query, { $set: course }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'course updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid course name... course not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update course', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// remove a course by _id
router.delete('/removebyid/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    Course.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'course deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid course id... course not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to delete course', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// remove a course by courseCode
router.delete('/removebycode/:courseCode', (req, res, next) => {

    const query = { courseCode: req.params.courseCode }

    Course.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'course deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid course name... course not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to delete course', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;