import mongoose from "mongoose";

const schema = new mongoose.Schema({
    image: { public_id: String, imgUrl: String },
    name: {
        type: String,
        required: true
    },
    board: {
        type: String,
        required: true
    },
    gpio: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
});

export const Device = mongoose.model("Device", schema);
