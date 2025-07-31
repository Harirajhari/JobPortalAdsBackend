import express from 'express';
import { getAdmins, createAdmin, loginAdmin } from '../controllers/AdminController.js';

const router = express.Router();

// GET all admins (optional, for admin listing/debugging)
router.get('/', getAdmins);

// SIGNUP
router.post('/signup', createAdmin);

// LOGIN
router.post('/login', loginAdmin);

export default router;
