import express from "express";
import { viewAttendance } from "../controllers/attendance.js";
import { submitFeedback } from "../controllers/feedback.js";
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRole.js';
import { updateStudentProfile } from '../controllers/student.js';

const router = express.Router();

router.get("/attendance/:student_id", viewAttendance);
router.post("/feedback", submitFeedback);

router.put('/update-profile', protect, authorizeRoles('student'), updateStudentProfile); // Only students can update their own profile

export default router;