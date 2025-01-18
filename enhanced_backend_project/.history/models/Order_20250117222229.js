import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        username: { type: String, required: true },
        email: { type: String, required: true },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
