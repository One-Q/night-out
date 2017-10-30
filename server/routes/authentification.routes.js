import { Router } from 'express';
import * as AuthentificationController from '../controllers/authentification.controller';

const router = new Router();

// Log a user
router.route('/login').post(AuthentificationController.login);

// Check if a user is logged
router.route('/amilogged').get(AuthentificationController.amILogged);

export default router;
