const express = require('express');
const router = express.Router();

let objectId = require('mongoose').Types.ObjectId;

const Department = require('../Models/department.model');

// create department
router.post('/create', (req, res, next) => {

    let newDepartment = new Department(req.body);

    newDepartment.save((err, doc) => {
        if(!err){
            res.json({success: true, msg: 'department created', data: doc});
        } 
        else{
            res.json({success: false, msg: 'Failed to create department', error: err});
        } 
    }); 
});

// fetch department by departmentName
router.get('/get-by-name/:departmentName', (req, res, next) => {
    
    const query = { departmentName: req.params.departmentName }
    Department.findOne(query, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null){
            res.json({ success: true, msg: 'Department doesnt exist... invalid department name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Department', error: err});
        };
    });
});

// fetch department by departmentCode
router.get('/get-by-code/:departmentCode', (req, res, next) => {

    const query = { departmentCode: req.params.departmentCode }
    Department.findOne(query, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null){
            res.json({ success: true, msg: 'Department doesnt exist... invalid department code', data: doc });
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Department', error: err});
        };
    });
})

// fetch department by _id
router.get('/get-by-id/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) {
        return res.status(400).send(`Invalid ID ${req.params.id}`)
    };

    Department.findById(req.params.id, (err, doc) => {

        if (!err && doc != null) {
            res.json({success: true, data: doc});
        }
        else if (doc == null){
            res.json({ success: true, msg: 'Department doesnt exist... ID doesnt exist as a department', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Department', error: err});
        };
    });
});

// fetch all departments
router.get('/', (req, res, next) => {

    Department.find((err, doc) => {
        if (!err) {
            res.json({ success: true, msg: 'Departments fetched successfully', data: doc});
        }
        else {
            res.json({success: false, msg: 'failed to get Departments', error: err});
            console.log('Error getting Departments List ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// fetch departments by facultyName
router.get('/get-by-facultyname/:facultyName', (req, res, next) => {

    const query = { facultyName: req.params.facultyName };

    Department.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'faculty doesnt exist... invalid faculty name', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Departments', error: err});
        };
    });
});

// fetch departments by facultyid
router.get('/get-by-facultyid/:facultyId', (req, res, next) => {

    if(!objectId.isValid(req.params.facultyId)) return res.status(400).send(`Invalid ID ${req.params.facultyId}`);

    const query = { facultyId: req.params.facultyId };

    Department.find(query, (err, doc) => {

        if (!err && doc.length > 0) {
            res.json({success: true, data: doc});
        }
        else if (doc.length == 0){
            res.json({ success: true, msg: 'faculty doesnt exist... id doesnt exist as a faculty', data: doc});
        }
        else {
            res.json({success: false, msg: 'Failed to fetch Departments', error: err});
        };
    });
});

// update department by _id
router.put('/update-by-id/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    let department = req.body;

    Department.findByIdAndUpdate(req.params.id, { $set: department }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'department updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid department id... department not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update department', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update department by departmentName
router.put('/update-by-name/:departmentName', (req, res, next) => {

    let department = req.body;

    const query = { departmentName: req.params.departmentName };

    Department.findOneAndUpdate(query, { $set: department }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'department updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid department name... department not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update department', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update department by departmemtCode
router.put('/update-by-code/:departmentCode', (req, res, next) => {

    let department = req.body;

    const query = { departmemtCode: req.params.departmemtCode };

    Department.findOneAndUpdate(query, { $set: department }, { new: true }, (err, doc) => {
        
        if(!err && doc != null) {
            res.json({ success: true, msg: 'department updated successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid department code... department not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to update department', error: err});
            console.log('Update Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// delete department by _id
router.delete('/remove-by-id/:id', (req, res, next) => {

    if(!objectId.isValid(req.params.id)) return res.status(400).send(`Invalid ID ${req.params.id}`);

    Department.findByIdAndRemove(req.params.id, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'department deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid department id... department not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to delete department', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// delete department by departmentName
router.delete('/remove-by-name/:departmentName', (req, res, next) => {

    const query = { departmentName: req.params.departmentName }

    Department.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'department deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid department name... department not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to delete department', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// delete department by departmentCode
router.delete('/remove-by-code/:departmentCode', (req, res, next) => {

    const query = { departmentCode: req.params.departmentCode }

    Department.findOneAndRemove(query, (err, doc) => {

        if(!err && doc != null) {
            res.json({ success: true, msg: 'department deleted successfully', data: doc});
        }
        else if(doc == null){
            res.json({ success: true, msg: 'invalid department code... department not registered', data: doc });
        }
        else {
            res.json({success: false, msg: 'failed to delete department', error: err});
            console.log('Delete Unsuccessful...An error occured : ' + JSON.stringify(err, undefined, 2));
        }
    });
});


module.exports = router;
