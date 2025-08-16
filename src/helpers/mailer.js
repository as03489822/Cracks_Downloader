import nodemailer from 'nodemailer';

export const sendEmail = async({email , text })=>{
    try {
        const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
        });
        const mailOptions = await transporter.sendMail({
            from: email,
            to: "as03489822@gmail.com",
            subject: "Contect Us",
            text: text, 
            // html: "<b>Hello world?</b>", // HTML body
        });

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        
    } catch (error) {
        throw new Error(error.message)
    }
}