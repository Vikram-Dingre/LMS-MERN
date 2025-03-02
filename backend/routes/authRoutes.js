import express, { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import protectRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-auth", protectRoute, (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "user is authenticated", user: req?.user });
});
export default router;
