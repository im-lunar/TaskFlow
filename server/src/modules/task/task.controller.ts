import type { Request, Response } from "express";
import { createTaskService, deleteTaskService, getTaskByIdService, getTasksService, updateTaskService, updateTaskStatusService } from "./task.service.js";
import type { CreateTaskRequestDto, UpdateTaskRequestDto, UpdateTaskStatusRequestDto } from "./task.dto.js";

export const createTaskController = async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;
    const { userId } = req.user;

    const task = await createTaskService(workspaceId, userId, req.body as CreateTaskRequestDto);

    res.status(201).json({
        message: "Task created successfully",
        task
    });
}

export const  getTasksController = async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;
    const { userId } = req.user;

    const tasks = await getTasksService(workspaceId, userId);

    res.json({
        tasks
    });
}

export const getTaskByIdController = async (req: Request, res: Response) => {
    const taskId = req.params.taskId as string;
    const { userId } = req.user;

    const task = await getTaskByIdService(taskId, userId);

    res.status(200).json({
        task
    });
}

export const updateTaskController = async (req: Request, res: Response) => {
    const taskId = req.params.taskId as string;
    const { userId } = req.user;

    const task = await updateTaskService(taskId, userId, req.body as UpdateTaskRequestDto);

    res.status(200).json({
        message: "Task details updated successfully",
        task
    })
}

export const updateTaskStatusController = async (req: Request, res: Response) => {
    const taskId = req.params.taskId as string;
    const { userId } = req.user;
    const { status } = req.body as UpdateTaskStatusRequestDto;

    const task = await updateTaskStatusService(taskId, userId, status);

    res.status(200).json({
        message: "Task Status updated successfully",
        task
    });
}

export const deleteTaskController = async (req: Request, res: Response) => {
    const taskId = req.params.taskId as string;
    const { userId } = req.user;

    await deleteTaskService(taskId, userId);

    res.sendStatus(204);
}