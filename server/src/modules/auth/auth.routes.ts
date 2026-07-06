import { Router } from "express";
import { getCurrentUserController, loginController, signupController } from "./auth.controller.js"
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(signupController));

router.post("/login", validate(loginSchema), asyncHandler(loginController));

router.get("/me", authMiddleware, asyncHandler(getCurrentUserController));

export default router;