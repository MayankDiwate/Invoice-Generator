import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

export default router;
