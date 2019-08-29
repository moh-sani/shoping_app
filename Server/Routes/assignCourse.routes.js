const express = require('express');
const router = express.Router();

let objectId = require('mongoose').Types.ObjectId;

const AssignCourse = require('../Models/assignCoursetoLecturer.model');


//assign course to lecturer 
router.post('/assigncoursetolecturer/:lecturerId', (req, res, next) => {


});



module.exports = router;