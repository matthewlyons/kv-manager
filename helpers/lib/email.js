require('dotenv').config();

const nodemailer = require('nodemailer');

const mailerConfig = {
  host: 'smtp.office365.com',
  secureConnection: true,
  port: 587,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
};

module.exports = {
  async sendEmail(to, html) {
    console.log('Sending Email');
    let transporter = nodemailer.createTransport(mailerConfig);
    let mailOptions = {
      from: 'Kennedy Violins <rewards@kennedyviolins.com>',
      to,
      subject: 'Thank you for Activating!',
      html
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Success');
          resolve('Success');
        }
      });
    });
  }
};
