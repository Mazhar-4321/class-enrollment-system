import User from '../models/user.model';
import Otp from '../models/otp.model';
import { sendEmail } from '../utils/user.util';
import Jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');


export const newUser = async (body) => {
  body.password = bcrypt.hashSync(body.password, 10)
  try {
    const data = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    });
    return data;
  } catch (err) {
    throw new Error(err)
  }


};

export const signIn = async (userData) => {
  try {
    const data = await User.find({
      "email": userData.email
    })
    if (data.length >= 1) {
      const verified = bcrypt.compareSync(userData.password, data[0].password)
      if (verified) {
        var token = await Jwt.sign({ email: userData.email }, process.env.SECRET_KEY);
        return token
      } else {
        throw new Error('Invalid Password')
      }
    } else {
      throw new Error('Invalid Email');
    }
  }
  catch (err) {
    throw new Error(err)
  }
}

export const sendOtp = async (body) => {
  var randomNumber = Math.floor(1000 + Math.random() * 9000)
  try {
    var response = await sendEmail(body.email, randomNumber)
    if (response === 0) {
      response.status(500).json({
        code: 500,
        message: "Email  is Invalid ",
      });
    } else {
      var data = await Otp.create({
        otp: randomNumber,
        expiry: Date.now() + 120000,
        email: body.email
      })
      return data;
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const validateOtp = async (body) => {
  try {
    var response = await Otp.findOne({
      otp: body.otp,
      email: body.email
    })
    var time = Date.now()
    if (response.expiry - time <= 120000) {
      return 1;
    } else {
      return 0;
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const forgetPassword = async (body) => {
  try {
    var response = await User.findOne(body)
    if (response) {
      var emailResponse = await sendOtp(body)
      return emailResponse
    } else {
      throw new Error("Email Doesn't Exists")
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const resetPassword = async (body) => {
  try {
    var otpResponse = await validateOtp(body)
    if (otpResponse) {
      var response = await User.findOne({ email: body.email })
      if (response) {
        const newPassword = bcrypt.hashSync(body.password, 10);
        const filter = { email: body.email };
        const update = { password: newPassword };
        const data = await User.findOneAndUpdate(filter, update, { new: true });
        return data
      } else {
        throw new Error("Email Doesn't Exists")
      }
    } else {
      throw new Error('Otp is Invalid')
    }
  } catch (err) {
    throw new Error(err)
  }
}
