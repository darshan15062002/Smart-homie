import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { createDevices, deleteOutput, getAllDevices, getAllOutputStates, updateOutput } from "../controller/device.js";
const router = express.Router();


// POST /devices/create
router.post("/create", isAuthenticated, createDevices);

// GET /devices
router.get("/", isAuthenticated, getAllDevices);

// PUT /devices/:id/update
router.put("/update/:id", isAuthenticated, updateOutput);

// DELETE /devices/:id/delete
router.delete("/delete/:id", isAuthenticated, deleteOutput);

router.get('/allOutputStates', getAllOutputStates);


export default router;