import type { Request, Response } from "express";
import { createTaskService } from "./task.service.js";
import type { CreateTaskRequestDto } from "./task.dto.js";

export const createTaskController = async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;
    const { userId } = req.user;

    const task = await createTaskService(workspaceId, userId, req.body as CreateTaskRequestDto);

    res.status(201).json({
        message: "Task created successfully",
        task
    });
}