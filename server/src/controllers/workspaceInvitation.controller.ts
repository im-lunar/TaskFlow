import type { Request, Response } from "express";
import { acceptWorkspaceInvitationService, createWorkspaceInvitationService, rejectWorkspaceInvitationService } from "../services/workspaceInvitation.service.js";

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

export const acceptWorkspaceInvitationController = async (req: Request, res: Response) => {
    const invitationId = req.params.invitationId as string;
    const { userId } = req.user;

    const result = await acceptWorkspaceInvitationService(invitationId, userId);

    res.status(200).json({
        message: "Invitation accepted successfully",
        ...result
    });
}

export const rejectWorkspaceInvitationController = async (req: Request, res: Response) => {
    const invitationId = req.params.invitationId as string;
    const { userId } = req.user;

    const invitation = await rejectWorkspaceInvitationService(invitationId, userId);

    res.status(200).json({
        message: "Invitation rejected successfully",
        invitation
    });
}