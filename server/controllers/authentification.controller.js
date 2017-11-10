import jwt from 'jwt-simple';
import auth from '../auth';
import User from '../models/user';


export function login(req, res) {
    if (req.body.username && req.body.password) {
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({ username }).then((user) => {
            if (user) {
                if (user.validatePassword(password)) {
                    let payload = { id: user.cuid };
                    let token = jwt.encode(payload, 'secret');
                    res.json({ token: token });
                }
                else {
                    res.sendStatus(403);
                }
            }
            else
                res.sendStatus(402);
        });
    }
    else {
        res.sendStatus(401);
    }
}

export function amILogged(req, res) {
    return res.json({
        user: { ok: true }
    });
}