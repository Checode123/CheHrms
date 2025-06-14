import express from "express";
import {
  getAllAllotments,
  getStudentAllotment,
  getAllStudents,
} from "../controllers/warden.js";

import {
  addNotice,
  deleteNotice,
  getAllNotices,
} from "../controllers/notice.js";

import { markAttendance , viewAttendance} from "../controllers/attendance.js";

const router = express.Router();

router.get("/allotments", getAllAllotments);
router.get("/allotment/:student_id", getStudentAllotment); //Api for warden to see student data
router.get('/students', getAllStudents); // 🆕 New route

router.post("/notices", addNotice);
router.delete("/notices/:id", deleteNotice);
router.get("/notices", getAllNotices);

// attendance
router.post("/attendance", markAttendance);
// fro veiwing particular studet's attendance
router.get("/attendance/:student_id", viewAttendance);

export default router;
