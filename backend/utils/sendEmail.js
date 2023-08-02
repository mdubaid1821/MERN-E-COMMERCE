const nodemailer = require("nodemailer");


const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,      // Remove the quotes around options.email
        subject: options.subject,      // Remove the quotes around options.subject
        text: options.message,      // Remove the quotes around options.message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
