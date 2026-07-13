import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteTaskController, getTaskByIdController, updateTaskController, updateTaskStatusController } from "./task.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { UpdateTaskStatusSchema } from "./task.validation.js";

const router = Router();

router.get("/tasks/:taskId", authMiddleware, asyncHandler(getTaskByIdController));

router.patch("/tasks/:taskId", authMiddleware, asyncHandler(updateTaskController));

router.patch("/tasks/:taskId/status", authMiddleware, validate(UpdateTaskStatusSchema), asyncHandler(updateTaskStatusController));

router.delete("/tasks/:taskId", authMiddleware, asyncHandler(deleteTaskController));

export default router;