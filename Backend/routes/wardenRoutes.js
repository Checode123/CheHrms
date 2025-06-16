import express from "express";
import {
  getAllAllotments,
  getStudentAllotment,
  getAllStudents,
  generateAllotmentPDF,
} from "../controllers/warden.js";

import {
  addNotice,
  deleteNotice,
  getAllNotices,
} from "../controllers/notice.js";

import {
  markAttendance,
  viewAttendance
} from "../controllers/attendance.js";

import {
  getAllFeedbacks,
  updateFeedbackStatus
} from "../controllers/feedback.js";

import { authorizeRoles } from '../middleware/authorizeRole.js';

const router = express.Router();

// Apply role-based protection to all warden routes
router.use(authorizeRoles('warden'));

router.get("/allotments", getAllAllotments);
router.get("/allotment/:student_id", getStudentAllotment);
router.get("/students", getAllStudents);

router.post("/notices", addNotice);
router.delete("/notices/:id", deleteNotice);
router.get("/notices", getAllNotices);

router.post("/attendance", markAttendance);
router.get("/attendance/:student_id", viewAttendance);

router.get("/feedbacks", getAllFeedbacks);
router.patch("/feedbacks/:id", updateFeedbackStatus);

router.get("/allotment-pdf/:student_id", generateAllotmentPDF);

export default router;
