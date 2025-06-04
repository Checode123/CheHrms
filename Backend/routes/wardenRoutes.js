import express from "express";

import { addNotice, deleteNotice, getAllNotices  } from "../controllers/notice.js";
const router = express.Router();

router.post('/notices', addNotice);
router.delete("/notices/:id", deleteNotice);
router.get("/notices", getAllNotices);

export default router;