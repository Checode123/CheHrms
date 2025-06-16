import express from 'express';
import { applyForHostel } from '../controllers/hostel.js';
import { getAllHostelApplications } from '../controllers/hostel.js';
import { updateApplicationStatus } from '../controllers/hostel.js';
import { withdrawApplication } from '../controllers/hostel.js';
import { viewApplicationStatus } from '../controllers/hostel.js';
import { listAllHostels } from '../controllers/hostel.js';

const router = express.Router();

router.post('/apply-hostel', applyForHostel);

router.get('/applications', getAllHostelApplications);

router.patch('/update-status', updateApplicationStatus);

router.delete('/withdraw/:student_id', withdrawApplication);

router.get('/status/:student_id', viewApplicationStatus);

router.get('/list-hostels', listAllHostels);

export default router;