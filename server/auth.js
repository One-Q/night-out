import passport from 'passport';
import passportJWT, {ExtractJwt, Strategy} from 'passport-jwt';

import User from './models/user';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

module.exports = function () {
    let strategy = new Strategy(jwtOptions, function (payload, done) {
        User.findOne({cuid : payload.id}).then((user) => {
            if (user)
                return done(null, { id: user.cuid });
            else
                return done(new Error('User not found'), null);
        });
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false });
        }
    }
}();