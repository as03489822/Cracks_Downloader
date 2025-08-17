import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
