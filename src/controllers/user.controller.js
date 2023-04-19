import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


 
export const newUser = async (req, res, next) => {
  try {
    const response = await UserService.validateOtp(req.body);
    if (response == 1) {
      const data = await UserService.newUser(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'User created successfully'
      });
    } else {
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        code: HttpStatus.NOT_ACCEPTABLE,
        message: 'OTP Expired'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const data = await UserService.sendOtp(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Otp Sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Otp Sent successfully'
      });
    }
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Password Reset Successful'
      });
    }
  } catch (error) {
    next(error);
  }
}

export const signInUser = async (req, res, next) => {
  try {
    const data = await UserService.signIn(req.body);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: req.body.email,
        token: data
      });
    } else {
      throw new Error('Database Operation Failed')
    }
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      error: error.message.split(":")[1],
    });
  }
}


