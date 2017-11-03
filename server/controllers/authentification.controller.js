import jwt from 'jsonwebtoken';
import passport from '../passport';

export function login(req, res) {
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err)
            return err;
        if (!user) {
            return res.status(400).json({ user: { ok: false }, message: 'Echec de la connexion' });
        }
        else {
            const payload = { usnername: user.usnername };
            const options = { subject: user.cuid };
            const token = jwt.sign(payload, 'secret', options);

            req.session.token = token;

            return res.json({ message: '', user: { ok: true, token } });
        }
    });
    /*const username = req.query.username;
    const password = req.query.password;
    if (!username || !password)
        return res.status(400).send('Missing username or password!');
    console.log('User trying to log in : ' + username);
    res.json({ username: username });*/
}

export function amILogged(req, res) {
    //TODO
    res.status(200).end();
}