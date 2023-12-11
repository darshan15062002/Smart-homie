import app from "./app.js"
import { connectDB } from "./server/data/database.js";


connectDB();







app.listen(process.env.PORT, () => {
    console.log(
        `Server listening on port: ${process.env.PORT}`
    );
});