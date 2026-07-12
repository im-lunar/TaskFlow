import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createTaskController, getTasksController } from "./task.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { taskSchema } from "./task.validation.js";

const router = Router();

router.post("/:workspaceId/tasks", authMiddleware, validate(taskSchema), asyncHandler(createTaskController));

router.get("/:workspaceId/tasks", authMiddleware, asyncHandler(getTasksController));

export default router;