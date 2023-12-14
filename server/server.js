import app from "./app.js"
import { connectDB } from "./server/data/database.js";
import cloudinary from "cloudinary";

connectDB();




cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});


app.listen(process.env.PORT, () => {
    console.log(
        `Server listening on port: ${process.env.PORT}`
    );
});