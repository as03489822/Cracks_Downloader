import Crack from "@/models/Crack";
import Review from "@/models/Review";
import { NextResponse } from "next/server";
import { connectDB } from '@/dbConfig/dbConfig';

export async function POST(request ,  { params }){
    try {
        await connectDB();
        const { id } = await params; 
        const { username, email, comment } = await request.json(); 

        if(!email || !comment){
            return new NextResponse({error : "Make sure all field are provide" }, {status: 404})
        }

        const crack = await Crack.findById(id);
        const newReview = new Review({
            username ,
            email,
            comment
        });
 
        crack.reviews.push(newReview);
        await crack.save();
        await newReview.save();

        return  NextResponse.json({success: true ,review:newReview , message: "comment successfully"} , {status: 200})
    } catch (error) {
        console.error(error);
        return  NextResponse.json(
            { error: "Server error" , detail: error},
            { status: 500 }
        );
    }
}


export async function DELETE(request ,  { params }){
    try {
        await connectDB();
        const {id} = await params;
        const {reviewId} = await request.body();

        if(!reviewId){
            return NextResponse({error : "reveiw ID id required" }, {status: 404})
        }

        await Crack.findByIdAndUpdate(id , {$pull : {reviews : reviewId}})
        await Review.findByIdAndDelete(reviewId);
        return NextResponse.json({success: true , message: "Deleted Successfully"} , {status: 200})
    } catch (error) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" , detail: err},
            { status: 500 }
        );
    }
}