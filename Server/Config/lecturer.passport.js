const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Lecturer = require('../Models/lecturer.model');
const config = require('./db');

module.exports = (passport) => {
    
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        Lecturer.getLecturerById(jwt_payload._id, (err, lecturer) => {
            if(err){
                return done(err, false);
            }

            if(lecturer){
                return done(null, lecturer);
            } else {
                return done(null, false);
            }

        });
    }));
}