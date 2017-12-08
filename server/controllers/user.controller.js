import User from '../models/user';
import cuid from 'cuid';
import slug from 'limax';
import nodemailer from 'nodemailer';
import regex from '../util/regex';
import validator from 'express-validator';

export function signUp(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    req.checkBody('username', 'Veuillez entrer un nom d\'utilisateur valide.').matches(regex.regUsername);     // //Username 6-15 carac ne peut pas commencer par un chiffre
    req.checkBody('email', 'Veuillez entrer une adresse email valide.').isEmail();
    req.checkBody('password', 'Veuillez entrer un mot de passe valide.').matches(regex.regPassword);     // //mdp 8-64 carac sans espaces
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({ error: errors[0]['msg'] });
    }
    Promise.all([checkEmail(email), checkUsername(username)]).then(() => {
        const newUser = new User({ username: username, email: email, slug: slug(username.toLowerCase(), { lowercase: true }), cuid: cuid() });
        newUser.password = newUser.generateHash(password);
        User.create(newUser, (error) => {
            if (!error) {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'webprojectnightout@gmail.com',
                        pass: 'nightoutRRQ',
                    },
                });
                const mailOptions = {
                    from: 'webprojectnightout@gmail.com', // sender address
                    to: newUser.email, // list of receivers
                    subject: 'Signed Up', // Subject line
                    html: `<p>You are signed up : ${newUser.username}</p>`// plain text body
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });
                return res.status(200).json({ success: "ok" });
            }
            console.log('Erreur d\'insertion user : ' + error);
            return res.status(500).json({ error: 'Erreur interne' });
        })
    }).catch((error) => {
        return res.status(400).json({ error: error });
    })
}

export function changePassword(req, res) {
    let cuid = req.user.id;
    let newPassword = req.body.newPassword;
    req.checkBody('newPassword', 'Veuillez entrer un nouveau mot de passe valide.').matches(regex.regPassword);     // //mdp 8-64 carac sans espaces
    let errors = req.validationErrors();
    if (errors) {
        return res.status(400).json({ error: errors[0]['msg'] });
    }
    User.findOne({ cuid }).then((user) => {
        if (!user) // Pas sensé arriver
            return res.status(500).json({ error: 'Erreur interne.' });
        user.password = user.generateHash(newPassword);
        user.save((err) => {
            if (err)
                return res.status(500).json({ error: 'Erreur interne' });
            return res.status(200).json({ success: "ok" });
        })
    });
}


function checkEmail(email) {
    return new Promise((res, rej) => {
        User.findOne({ email: email }).then((user) => {
            if (!user)
                res(true);
            else
                rej('Email déjà utilisé.');
        });
    })
}

function checkUsername(username) {
    return new Promise((res, rej) => {
        User.findOne({ username: username }).then((user) => {
            if (!user)
                res(true);
            else
                rej('Nom d\'utilisateur déjà utilisé.');
        });
    })
}