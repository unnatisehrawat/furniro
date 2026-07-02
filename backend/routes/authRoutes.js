import express from "express";
import { login, logout , verifyAuth } from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);

router.get("/verify", protectAdmin , verifyAuth )

export default router;
