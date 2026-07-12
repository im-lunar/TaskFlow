import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getTaskByIdController, updateTaskController } from "./task.controller.js";

const router = Router();

router.get("/tasks/:taskId", authMiddleware, asyncHandler(getTaskByIdController));

router.patch("/tasks/:taskId", authMiddleware, asyncHandler(updateTaskController));

export default router;