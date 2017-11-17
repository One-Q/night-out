import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import auth from '../auth';

const router = new Router();

router.route('/signup').post(UserController.signUp);

router.route('/changepassword').post(auth.authenticate(), UserController.changePassword);

export default router;