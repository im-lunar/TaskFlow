import { Router } from "express";
import { signupController } from "./auth.controller.js"
import { validate } from "../../middlewares/validate.middleware.js";
import { signupSchema } from "./auth.validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(signupController));

export default router;