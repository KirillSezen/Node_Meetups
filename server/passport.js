const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const User = require('./models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS
}

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = await User.findByPk(jwt_payload.id)
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (e) {
        return done(e, false)
    }
}))