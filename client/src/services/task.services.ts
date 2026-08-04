import api from "../api/axios"
import type { CreateTaskData, Task } from "../types/task";

type GetTasksResponse = {
    tasks: Task[];
}

export const getTasks = async (workspaceId: string): Promise<GetTasksResponse> => {
    const response = await api.get(`/workspaces/${workspaceId}/tasks`);
    return response.data;
}

export const createTasks= async (workspaceId: string, data: CreateTaskData) => {
    const response = await api.post(`/workspaces/${workspaceId}/tasks`, data);
    return response.data
}