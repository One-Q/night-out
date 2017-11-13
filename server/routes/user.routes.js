import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

router.route('/signup').post(UserController.signUp);

export default router;