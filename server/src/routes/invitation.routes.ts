import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
    acceptWorkspaceInvitationController,
    rejectWorkspaceInvitationController
} from "../controllers/workspaceInvitation.controller.js";

const router = Router();

router.patch(
    "/:invitationId/accept",
    authMiddleware,
    asyncHandler(acceptWorkspaceInvitationController)
);

router.patch(
    "/:invitationId/reject",
    authMiddleware,
    asyncHandler(rejectWorkspaceInvitationController)
);

export default router;