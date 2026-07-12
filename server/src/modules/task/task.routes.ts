import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getTaskByIdController } from "./task.controller.js";

const router = Router();

router.get("/tasks/:taskId", authMiddleware, asyncHandler(getTaskByIdController));

export default router;