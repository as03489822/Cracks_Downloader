import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email , emailType , userId})=>{
    try {
        const hashToken = await bcryptjs.hash(userId.toStrin(),10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId , {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId , {
                forgotPasswordToken: hashToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
        const mailOptions = await transporter.sendMail({
            from: 'as03489822@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Very your email':'Reset your password',
            text: "Hello world?", 
            // html: "<b>Hello world?</b>", // HTML body
        });

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
        
    } catch (error) {
        throw new Error(error.message)
    }
}