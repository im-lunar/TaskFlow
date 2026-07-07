import type { Request, Response } from "express";
import { createWorkspaceService, getWorkspacesService } from "./workspace.service.js";

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