
import DataUriParser from "datauri/parser.js";
import path from "path";
import { asyncError } from "../middleware/error.js";


export const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};

export const sendToken = asyncError(async (user, res, statusCode, message) => {
    const token = await user.generateToken()

    res.status(statusCode).cookie("token", token, {
        ...cookieOptions,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    },).json({
        success: true,
        status: statusCode,

        token,
        message: message,
    })
})
export const cookieOptions = {
    secure: process.env.NODE_ENV === 'development' ? false : true,
    httpOnly: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: process.env.NODE_ENV === 'development' ? false : "none",
}


