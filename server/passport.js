import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import User from './models/user';

const localOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passwordReqToCallback: true
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

const jwtSessionOptions = {
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.session) {
            token = req.session.token;
        }
        return token;
    },
    secretOrKey: 'secret'
}

const localCallback = (req, username, pass, done) => {
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                done(null, false);
            } else if (!user.checkPassword(pass)) {
                done(null, false);
            } else {
                done(null, user);
            }
        })
        .catch((err) => {
            done(err, false);
        });
};

const jwtCallback = (payload, done) => {
    const cuid = payload.sub;
    User.findOne({ cuid })
        .then((user) => {
            if (!user) {
                done(null, false);
            } else {
                done(null, user);
            }
        })
        .catch((err) => {
            done(err, false);
        });
};

const localStrategy = new LocalStrategy(
    localOptions, localCallback
);

const jwtStrategy = new JwtStrategy(
    jwtOptions, jwtCallback
);

const jwtSessionStrategy = new JwtStrategy(
    jwtSessionOptions, jwtCallback
);

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);
passport.use('jwt-session', jwtSessionStrategy)

export default passport;