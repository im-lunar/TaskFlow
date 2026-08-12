import api from "../api/axios"
import type { CreateTaskData, Task, TaskStatus, UpdateTaskData } from "../types/task";

type GetTasksResponse = {
    tasks: Task[];
}

export const getTasks = async (workspaceId: string): Promise<GetTasksResponse> => {
    const response = await api.get(`/workspaces/${workspaceId}/tasks`);
    return response.data;
}

export const createTasks = async (workspaceId: string, data: CreateTaskData) => {
    const response = await api.post(`/workspaces/${workspaceId}/tasks`, data);
    return response.data
}

export const updateTask = async (taskId: string, data: UpdateTaskData) => {
    const response = await api.patch(`/tasks/${taskId}`, data);
    return response.data;
}

export const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    const response = await api.patch(`tasks/${taskId}/status`, { status });
    return response.data;
}

export const deleteTask = async (taskId: string) => {
    const response = await api.delete(`/tasks/${taskId}`);

    return response.data;
}