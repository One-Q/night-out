import jwt from 'jwt-simple';
import auth from '../auth';
import User from '../models/user';
import validator from 'express-validator';
import regex from '../util/regex';

export function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    req.checkBody('username', 'Veuillez entrer un nom d\'utilisateur valide.').matches(regex.regUsername);     // //Username 6-15 carac ne peut pas commencer par un chiffre
    req.checkBody('password', 'Veuillez entrer un mot de passe valide.').matches(regex.regPassword);     // //mdp 8-64 carac sans espaces
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({ error: errors[0]['msg'] });
    }
    User.findOne({ username }).then((user) => {
        if (user) {
            if (user.validatePassword(password)) {
                let payload = { id: user.cuid };
                let token = jwt.encode(payload, 'secret');
                res.json({ token: token });
            }
            else {
                res.status(400).json({ error: "Mot de passe incorrect" });
            }
        }
        else
            res.status(400).json({ error: "Utilisateur introuvable" });
    });
}

export function amILogged(req, res) {
    return res.json({
        user: { ok: true }
    });
}