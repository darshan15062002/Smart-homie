import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { createDevices, deleteOutput, getAllDevices, getAllOutputStates, updateOutput } from "../controller/device.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();


// POST /devices/create
router.post("/create", isAuthenticated, singleUpload, createDevices);

// GET /devices
router.get("/", isAuthenticated, getAllDevices);

// PUT /devices/:id/update
router.put("/update/:id", isAuthenticated, updateOutput);

// DELETE /devices/:id/delete
router.delete("/delete/:id", isAuthenticated, deleteOutput);

router.get('/allOutputStates', getAllOutputStates);


export default router;