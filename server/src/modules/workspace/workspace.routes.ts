import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { workspaceSchema } from "./workspace.validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createWorkspaceController, getWorkspaceByIdController, getWorkspacesController, inviteMemberController, removeMemberController } from "./workspace.controller.js";
import { createWorkspaceInvitationController } from "../../controllers/workspaceInvitation.controller.js";
import { workspaceInvitationSchema } from "../../schemas/workspaceInvitation.schema.js";


const router = Router();

router.post("/", authMiddleware, validate(workspaceSchema), asyncHandler(createWorkspaceController));

router.get("/", authMiddleware, asyncHandler(getWorkspacesController));

router.get("/:workspaceId", authMiddleware, asyncHandler(getWorkspaceByIdController));

router.post("/:workspaceId/members", authMiddleware, asyncHandler(inviteMemberController));

router.delete("/:workspaceId/members/:memberId", authMiddleware, asyncHandler(removeMemberController));

router.post("/:workspaceId/invitations", authMiddleware, validate(workspaceInvitationSchema), asyncHandler(createWorkspaceInvitationController));

export default router;