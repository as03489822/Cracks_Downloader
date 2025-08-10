import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from 'bcryptjs'


export async function POST(request) {
    try {
        await connectDB();
        const reqBody = request.json();
        const { username , email , password} = reqBody;
        // Validation
        console.log(reqBody);

        const user = await user.findOne({email});
        
        if(!user){
            return NextResponse.json({message:"User already exists"},{status:400})
        }
        
        const salt = await bcryptjs.getSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt);
        
        const newUser= new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

        await sendEmail({email , emailType:"VERIFY" , userId: savedUser._id})

        return NextResponse.json({message : "User regester successfully" , success: true , savedUser},{status:200})

    } catch (error) {
        return NextResponse.json({message : error},{status:500})
    }
}