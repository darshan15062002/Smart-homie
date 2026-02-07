import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://darshanjain15062002:vBKhKJidKAiPI0v5@cluster0.sltrs2g.mongodb.net/new");

        console.log(`Server connected to database ${connection.host}`);
    } catch (error) {
        console.log("Some Error Occurred", error);
        process.exit(1);
    }
};
