import express from 'express'
import { config } from 'dotenv'
import { errorMiddleware } from './server/middleware/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


import user from './server/routes/user.js'
import device from './server/routes/device.js'
import room from './server/routes/room.js'


config({
    path: "./server/data/config.env"
})
const app = express()

// using middleware
app.use(express.json())
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["https://smart-homie.onrender.com"]
}
))
app.use(cookieParser());

// importing Router here
app.get("/", (req, res, next) => {
    res.send("working")
})
app.use("/api/v1/user", user)
app.use("/api/v1/device", device)
app.use("/api/v1/room", room)


// using Error middleware
app.use(errorMiddleware)

export default app