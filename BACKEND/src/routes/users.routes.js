


import { Router } from "express";
import { register, login, getUserHistory, addToHistory } from "../controller/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add_to_activity", addToHistory);
router.post("/get_all_activity", getUserHistory); // POST matches frontend

export default router;
