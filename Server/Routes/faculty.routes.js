const express = require('express');
const router = express.Router();

let objectId = require('mongoose').Types.ObjectId;
//let string = require('mongoose').Types.String;

const Faculty = require('../Models/faculty.model');

// create a faculty
router.post('/create', (req, res, next) => {

    let newFaculty = new Faculty(req.body);

    newFaculty.save((err, doc) => {
        if(!err){
            res.json({success: true, msg: 'Faculty created', data: doc});
        } 
        else{
            res.json({success: false, msg: 'Failed to create faculty', error: err});
        } 
    }); 
});

// fetch faculty by facultyname
router.get('/get-by-name/:facultyName', (req, res, next) => {

    const query = { facultyName: req.params.facultyName }
    Faculty.findOne(query, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'faculty doesnt exist... invalid faculty name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch faculty', error: err});
        };
    });
});

// fetch faculty by _id
router.get('/get-by-id/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) {
        return res.status(400).send(`Invalid ID ${req.params.id}`)
    };

    Faculty.findById(req.params.id, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'faculty doesnt exist... id doesnt exist as faculty', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch faculty', error: err});
        };
    });
});

//fetch all faculties
router.get('/', (req, res, next) => {

    Faculty.find((err, doc) => {
        if (!err) {
            res.json({ success: true, msg: 'faculties fetched successfully', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to get faculties', error: err});
            console.log('Error getting Faculties List ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update a faculty BY _id
router.put('/update-by-id/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    let faculty = req.body;

    Faculty.findByIdAndUpdate(req.params.id, { $set: faculty }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'faculty updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid faculty id... faculty not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update faculty', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update a faculty BY facultyName
router.put('/update-by-name/:facultyName', (req, res, next) => {

    let faculty = req.body;

    const query = { facultyName: req.params.facultyName };

    Faculty.findOneAndUpdate(query, { $set: faculty }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'faculty updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid faculty name... faculty not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update faculty', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// delete a faculty by _id
router.delete('/remove-by-id/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    Faculty.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'faculty deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid faculty id... faculty not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update faculty', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// delete a faculty by facultyName
router.delete('/remove-by-name/:facultyName', (req, res, next) => {

    const query = { facultyName: req.params.facultyName }

    Faculty.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'faculty deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid faculty name... faculty not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update faculty', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;