import { Router } from 'express';
import * as AuthentificationController from '../controllers/authentification.controller';
import passport from '../passport';

const router = new Router();

// Log a user
router.route('/login').post(AuthentificationController.login);

// Check if a user is logged
router.route('/amilogged').get(passport.authenticate('jwt', {session: false}),AuthentificationController.amILogged);

export default router;
