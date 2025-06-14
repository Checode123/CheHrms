import express from "express";
import { viewAttendance } from "../controllers/attendance.js";

const router = express.Router();

router.get("/attendance/:student_id", viewAttendance);

export default router;