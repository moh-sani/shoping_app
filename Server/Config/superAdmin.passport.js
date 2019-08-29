const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SuperAdmin = require('../Models/superAdmin.model');
const config = require('./db');

module.exports = (passport) => {
    
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        SuperAdmin.getSuperAdminById(jwt_payload._id, (err, superAdmin) => {
            if(err){
                return done(err, false);
            }

            if(superAdmin){
                return done(null, superAdmin);
            } else {
                return done(null, false);
            }

        });
    }));
}