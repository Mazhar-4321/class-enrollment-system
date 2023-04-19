import { Schema, model } from 'mongoose';

const otpSchema = new Schema(
  {
    otp: {
      type: Number
    },
    expiry: {
      type: Number
    },
    email:{
        type:String
    }
    
  },
  {
    timestamps: true
  }
);

export default model('otp', otpSchema);
