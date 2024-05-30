import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", verifyToken, signout);

export default router;
