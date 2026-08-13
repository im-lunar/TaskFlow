import type { Request, Response } from "express";
import { createWorkspaceInvitationService } from "../services/workspaceInvitation.service.js";

export const createWorkspaceInvitationController = async (req: Request, res:Response) => {
    const workspaceId = req.params.workspaceId as string;
    const { userId } = req.user;
    const { email } = req.body;

    const invitation = await createWorkspaceInvitationService(workspaceId, userId, email);

    res.status(201).json({
        message: "Invitation created successfully",
        invitation
    });
}