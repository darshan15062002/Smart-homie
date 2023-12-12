import { asyncError } from "../middleware/error.js";
import { Device } from "../model/device.js";

export const createDevices = asyncError(async (req, res, next) => {
    console.log(req.user._id, "createDevices");
    const userId = req?.user?._id
    const { name, board, gpio, state } = req.body;

    await Device.create({
        name,
        board,
        gpio,
        state,
        user: userId,
    })
    res.status(200).json({
        success: true,
        message: 'Device created successfully'
    });

})

export const getAllDevices = asyncError(async (req, res, next) => {
    const userId = req.user._id
    const device = await Device.find({ user: userId })

    res.status(200).json({
        success: true,
        device
    });


});

export const updateOutput = asyncError(async (req, res) => {
    const userId = req.user._id; // Assuming you have user information in the request
    const id = req.params.id
    const { state } = req.body;

    // Validate if the output belongs to the authenticated user
    const output = await Device.findById(id);
    if (!output || output.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }

    await Device.findByIdAndUpdate(id, { state });

    res.status(200).json({ success: true, message: 'Output state updated successfully' });
});

export const deleteOutput = asyncError(async (req, res) => {
    const userId = req.user._id; // Assuming you have user information in the request

    const id = req.params.id;

    // Validate if the output belongs to the authenticated user
    const output = await Device.findById(id);
    if (!output || output.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    await Device.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Board deleted successfully' });
});

export const getAllOutputStates = asyncError(async (req, res) => {
    const { board } = req.query;

    const outputs = await Device.find({ board });
    const rows = {};
    outputs.forEach((output) => {
        rows[output.gpio] = output.state;
    });

    res.status(200).json({ success: true, rows });
});