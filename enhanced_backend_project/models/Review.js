import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    src: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
