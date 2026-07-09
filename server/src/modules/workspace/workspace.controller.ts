import type { Request, Response } from "express";
import { createWorkspaceService, getWorkspaceByIdService, getWorkspacesService, inviteMemberService } from "./workspace.service.js";

export const createWorkspaceController = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const { userId } = req.user;

    const workspace = await createWorkspaceService(userId, name, description);

    res.json({
        message: "Workspace created successfully",
        workspace 
    });
}

export const getWorkspacesController = async (req:Request, res:Response) => {
    const { userId } = req.user;

    const workspaces = await getWorkspacesService(userId);

    res.json({
        workspaces
    });
}

export const getWorkspaceByIdController = async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;
    const { userId } = req.user;
    
    const workspace = await getWorkspaceByIdService(userId, workspaceId);

    res.status(200).json({
        workspace
    });
}

export const inviteMemberController = async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;
    const { userId } = req.user;
    const { email } = req.body;

    const member = await inviteMemberService(email, workspaceId, userId);

    res.status(201).json({
        message: "Member invited successfully",
        member
    });
}