const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../Models/student.model');
const config = require('./db');


module.exports = (passport) => {
    
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        Student.getStudentById(jwt_payload._id, (err, student) => {
            if(err){
                return done(err, false);
            }

            if(student){
                return done(null, student);
            } else {
                return done(null, false);
            }

        });
    }));
}