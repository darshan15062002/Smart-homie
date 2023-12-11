import express from 'express'
import { config } from 'dotenv'
import { errorMiddleware } from './server/middleware/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


import user from './server/routes/user.js'
// import product from './server/routes/product.js'
// import order from './server/routes/order.js'

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



// using Error middleware
app.use(errorMiddleware)

export default app