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

const router = express.Router();

router.get("/allotments", getAllAllotments);
router.get("/allotment/:student_id", getStudentAllotment); //Api for warden to see student data
router.get('/students', getAllStudents); // 🆕 New route

router.post("/notices", addNotice);
router.delete("/notices/:id", deleteNotice);
router.get("/notices", getAllNotices);

export default router;
