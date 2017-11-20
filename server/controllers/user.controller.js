import User from '../models/user';
import cuid from 'cuid';
import slug from 'limax';
import nodemailer from 'nodemailer';

const regUsername = /^[^\d\s][\S0-9]{5,14}$/;
const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPassword = /^\S{8,64}$/;

export function signUp(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if (!username || !email || !password)
        return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
    //Username 6-15 carac ne peut pas commencer par un chiffre
    if (!regUsername.test(username))
        return res.status(400).json({ error: 'Veuillez entrer un nom d\'utilisateur valide.' });
    if (!regEmail.test(email))
        return res.status(400).json({ error: 'Veuillez entrer une adresse email valide.' });
    //mdp 8-64 carac sans espaces
    if (!regPassword.test(password))
        return res.status(400).json({ error: 'Veuillez entrer un mot de passe valide.' });
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
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                 });
                 return res.sendStatus(200);
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
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    if (!cuid || !oldPassword || !newPassword)
        return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
    if (!regPassword.test(newPassword))
        return res.status(400).json({ error: 'Veuillez entrer un nouveau mot de passe valide.' });
    User.findOne({ cuid }).then((user) => {
        if (!user) // Pas sensé arriver
            return res.status(500).json({ error: 'Erreur interne.' });
        if (!user.validatePassword(oldPassword))
            return res.status(400).json({ error: 'Ancien mot de passe incorrect.' });
        user.password = user.generateHash(newPassword);
        user.save((err) => {
            if (err)
                return res.status(500).json({ error: 'Erreur interne' });
            return res.sendStatus(200);
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