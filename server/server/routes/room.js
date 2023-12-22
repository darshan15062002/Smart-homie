import express from 'express';
import { createRoom, getAllRooms, turnOnRoom, updateRoom } from '../controller/room.js';
import { singleUpload } from '../middleware/multer.js';
import { isAuthenticated } from '../middleware/auth.js';
import { getAllDevices } from '../controller/device.js';


const router = express.Router()


router.post('/create', isAuthenticated, singleUpload, createRoom)
router.put('/update/:id', isAuthenticated, singleUpload, updateRoom)
router.put('/turnon/:id', isAuthenticated, turnOnRoom)

router.get('/all', isAuthenticated, getAllRooms)
export default router