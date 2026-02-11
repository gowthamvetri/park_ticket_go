import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const sendMail = (data)=>{

    // 1. Create a transporter object
    const transporter = nodemailer.createTransport({
    service: 'gmail', // or Outlook365, etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Use App Password if 2FA is enabled
    }
    });

    // 2. Define email options
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.to,
    subject: data.subject,
    html: data.html // HTML body
    };

    // 3. Send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    });
}
