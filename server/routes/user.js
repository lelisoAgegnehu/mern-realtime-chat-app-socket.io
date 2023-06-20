import express from "express";
import { registerUser, loginUser, setAvatar } from "../controller/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/setAvatar/:id", setAvatar);

export default router;
