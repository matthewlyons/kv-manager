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
  async sendEmail(to, html, subject) {
    let transporter = nodemailer.createTransport(mailerConfig);
    let mailOptions = {
      from: 'Kennedy Violins <rewards@kennedyviolins.com>',
      to,
      subject,
      html
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve('Success');
        }
      });
    });
  }
};
