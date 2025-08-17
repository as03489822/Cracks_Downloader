import nodemailer from 'nodemailer';

export const sendEmail = async({email , text , subject })=>{
    try {
        const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
        });
        const mailOptions = {
            from: email,
            to: "as03489822@gmail.com",
            subject: subject,
            text: text,
            // html: "<b>Hello world?</b>", // Optional HTML body
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}