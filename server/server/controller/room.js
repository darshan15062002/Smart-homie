import { asyncError } from "../middleware/error.js";
import { Device } from "../model/device.js";
import { Room } from "../model/room.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";



export const createRoom = asyncError(async (req, res, next) => {

    const userId = req?.user?._id
    const { name, devices } = req.body;

    let image = undefined;
    if (req.file) {
        const file = getDataUri(req.file);
        const myCloud = await cloudinary.v2.uploader.upload(file.content);
        image = {
            public_id: myCloud.public_id,
            imgUrl: myCloud.secure_url,
        };

    }



    const resp = await Room.create({
        image,
        name,
        devices,
        user: userId,
    })

    res.status(200).json({
        success: true,
        message: "Place created Successfully",
        resp
    });


})
export const updateRoom = asyncError(async (req, res, next) => {

    const { name, devices } = req.body;
    const id = req.params.id

    const room = await Room.findById(id)



    let image = undefined;
    if (req.file) {
        const file = getDataUri(req.file);
        await cloudinary.v2.uploader.destroy(room.image.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(file.content);
        image = {
            public_id: myCloud.public_id,
            imgUrl: myCloud.secure_url,
        };

    }
    if (image) room.image = image;
    if (name) room.name = name;
    if (devices) room.devices = devices;

    const resp = await room.save()

    res.status(200).json({
        success: true,
        message: "Place Updated Successfully",
        resp
    });

})


export const turnOnRoom = asyncError(async (req, res, next) => {

    const { state } = req.body;
    const id = req.params.id;

    const room = await Room.findById(id)

    room.devices.forEach(async (device) => {
        await Device.findByIdAndUpdate(device, { state });
    })

    res.status(200).json({ success: true, message: 'Output state updated successfully' });
})

export const getAllRooms = asyncError(async (req, res, next) => {
    const userId = req.user._id
    const rooms = await Room.find({ user: userId })

    res.status(200).json({
        success: true,
        rooms
    });

})