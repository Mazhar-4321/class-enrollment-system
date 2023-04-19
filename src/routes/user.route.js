import express from 'express';
import * as userController from '../controllers/user.controller';
import { forgetPasswordAPIValidator, loginAPIValidator, newUserValidator, registerUserAPIValidator, resetPasswordAPIValidator, validateAPIValidator } from '../validators/user.validator';

const router = express.Router();

router.post('', registerUserAPIValidator, userController.newUser);

router.post('/validate', validateAPIValidator, userController.sendOtp);

router.post('/forget', forgetPasswordAPIValidator, userController.forgetPassword);

router.post('/reset', resetPasswordAPIValidator, userController.resetPassword);

router.post('/login', loginAPIValidator, userController.signInUser);


export default router;
