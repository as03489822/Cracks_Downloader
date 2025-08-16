import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    comment:{
        type:String
    }
})

const Review =mongoose.models.review || mongoose.model("reviews" , reviewSchema);

export default Review