import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { workspaceSchema } from "./workspace.validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createWorkspaceController, getWorkspaceByIdController, getWorkspacesController, inviteMemberController } from "./workspace.controller.js";


const router = Router();

router.post("/", authMiddleware, validate(workspaceSchema), asyncHandler(createWorkspaceController));

router.get("/", authMiddleware, asyncHandler(getWorkspacesController));

router.get("/:workspaceId", authMiddleware, asyncHandler(getWorkspaceByIdController));

router.post("/:workspaceId/members", authMiddleware, asyncHandler(inviteMemberController));

export default router;