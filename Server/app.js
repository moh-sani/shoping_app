const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./Config/db');

require('./Config/lecturer.passport')(passport);
require('./Config/student.passport')(passport);
require('./Config/superAdmin.passport')(passport);

// route imports
const student = require('./Routes/student.routes');
const faculty = require('./Routes/faculty.routes');
const department = require('./Routes/department.routes');
const course = require('./Routes/course.routes');
const lecturer = require('./Routes/lecturer.routes');
const superAdmin = require('./Routes/superAdmin.routes');
const studentOlevel = require('./Routes/studentOlevel.routes');
const studentAlevel = require('./Routes/studentAlevel.routes');
const courseReg = require('./Routes/courseRegistration.routes');

// Database connection
mongoose.connect(config.database);

// on successfull connection
mongoose.connection.on('connected', () => {
    console.log(`Connected to database successfully ${config.database}`);
})

// on connection failure
mongoose.connection.on('error', (err) => {
    console.log(`Databaase connection error ${err}`);
})

const app = express();

const port = 3000;

// Corse Middleware
app.use(cors());

// Body-Parser Middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes endpoints
app.use('/api/student', student);
app.use('/api/lecturer', lecturer);
app.use('/api/faculty', faculty);
app.use('/api/department', department);
app.use('/api/superadmin', superAdmin);
app.use('/api/studentolevel', studentOlevel);
app.use('/api/studentalevel', studentAlevel);
app.use('/api/course', course);
app.use('/api/courseReg', courseReg);

app.listen(port, ()=> { console.log(`Server listening on port ${port}...`)});