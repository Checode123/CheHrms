import express from 'express';
import { applyForHostel } from '../controllers/hostel.js';
import { getAllHostelApplications } from '../controllers/hostel.js';
import { updateApplicationStatus } from '../controllers/hostel.js';
const router = express.Router();

router.post('/apply-hostel', applyForHostel);

router.get('/applications', getAllHostelApplications);

router.patch('/update-status', updateApplicationStatus);

export default router;