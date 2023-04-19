const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'syedmazharali742@gmail.com',
        pass: 'wifncqjudispvcld'
    }
});


export const sendEmail = async (recipient='', message,response) => {
    try {
    var result=    await transporter.sendMail({
            from: 'syedmazharali742@gmail.com',
            to: recipient,
            subject: `OTP`,
            text: `${message}`
        }, (err, res) => {
            if (err) {
                return 0;
            }
            return 1;
            // response.status(200).json({
            //     code: 200,
            //     message: "Email Sent Successfully",
            //   });
              //An OTP With 4 digit Number is sent to ${recipient.substring(0,2)+"*****"+recipient.substring(recipient.length-2)}
        });
    } catch (err) {
        throw new Error(err);
    }
}