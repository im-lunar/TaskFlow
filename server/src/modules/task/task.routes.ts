import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createTaskController } from "./task.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { taskSchema } from "./task.validation.js";

const router = Router();

router.post("/:workspaceId/tasks", authMiddleware, validate(taskSchema), asyncHandler(createTaskController));

export default router;