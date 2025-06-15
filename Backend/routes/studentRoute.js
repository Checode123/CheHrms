import express from "express";
import { viewAttendance } from "../controllers/attendance.js";
import { submitFeedback } from "../controllers/feedback.js";

const router = express.Router();

router.get("/attendance/:student_id", viewAttendance);
router.post("/feedback", submitFeedback);

export default router;