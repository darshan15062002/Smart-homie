import { asyncError } from "../middleware/error.js";
import { User } from "../model/user.js";
import ErrorHandler from "../utils/error.js";
import {
    cookieOptions,


    sendToken,
} from "../utils/features.js";


export const login = asyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Incorrect Email or Password", 400));
    }

    if (!password) return next(new ErrorHandler("Please Enter Password", 400));

    // Handle error
    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
        return next(new ErrorHandler("Incorrect Email or Password", 400));
    }
    sendToken(user, res, 200, `Welcome Back, ${user.name}`);
});

export const signup = asyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(name, email, password, "Please Enter Password");
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));



    user = await User.create({
        name,
        email,
        password,

    });

    sendToken(user, res, 201, `Registered Successfully`);
});

export const logOut = asyncError(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            ...cookieOptions,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        });
});

export const getMyProfile = asyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});


// export const changePassword = asyncError(async (req, res, next) => {
//     const user = await User.findById(req.user._id).select("+password");

//     const { oldPassword, newPassword } = req.body;

//     if (!oldPassword || !newPassword)
//         return next(
//             new ErrorHandler("Please Enter Old Password & New Password", 400)
//         );

//     const isMatched = await user.comparePassword(oldPassword);

//     if (!isMatched) return next(new ErrorHandler("Incorrect Old Password", 400));

//     user.password = newPassword;
//     await user.save();

//     res.status(200).json({
//         success: true,
//         message: "Password Changed Successully",
//     });
// });



// export const forgetpassword = asyncError(async (req, res, next) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return next(new ErrorHandler("Incorrect Email", 404));
//     // max,min 2000,10000
//     // math.random()*(max-min)+min

//     const randomNumber = Math.random() * (999999 - 100000) + 100000;
//     const otp = Math.floor(randomNumber);
//     const otp_expire = 15 * 60 * 1000;

//     user.otp = otp;
//     user.otp_expire = new Date(Date.now() + otp_expire);
//     await user.save();

//     const message = `Your OTP for Reseting Password is ${otp}.\n Please ignore if you haven't requested this.`;
//     try {
//         await sendEmail("OTP For Reseting Password", user.email, message);
//     } catch (error) {
//         user.otp = null;
//         user.otp_expire = null;
//         await user.save();
//         return next(error);
//     }

//     res.status(200).json({
//         success: true,
//         message: `Email Sent To ${user.email}`,
//     });
// });

// export const resetpassword = asyncError(async (req, res, next) => {
//     const { otp, password } = req.body;

//     const user = await User.findOne({
//         otp,
//         otp_expire: {
//             $gt: Date.now(),
//         },
//     });

//     if (!user)
//         return next(new ErrorHandler("Incorrect OTP or has been expired", 400));

//     if (!password)
//         return next(new ErrorHandler("Please Enter New Password", 400));

//     user.password = password;
//     user.otp = undefined;
//     user.otp_expire = undefined;

//     await user.save();

//     res.status(200).json({
//         success: true,
//         message: "Password Changed Successfully, You can login now",
//     });
// });