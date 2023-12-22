import mongoose from "mongoose";

const schema = new mongoose.Schema({
    image: { public_id: String, imgUrl: String },
    name: {
        type: String,
        required: true
    },
    devices: [
        {
            type: String,
            required: true
        }
    ],
    state: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
});

export const Room = mongoose.model('Room', schema);
