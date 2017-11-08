import jwt from 'jsonwebtoken';
import passport from '../passport';

export function login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                user: { ok: false },
                message: 'Faliure to login',
            });
        } else {
            const payload = { username: user.username };
            const options = { subject: user.cuid };
            const token = jwt.sign(payload, 'secret', options);

            req.session.token = token;

            return res.json({
                message: '',
                user: { ok: true, token }
            });
        }
    })(req, res, next);
}

export function amILogged(req, res) {
    return res.json({
        user:{ ok: true }
    });
}