import express from "express";
import { registerStudent, loginUser } from '../controllers/auth.js'

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginUser);

export default router;
