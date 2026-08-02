import api from "../api/axios";
import type { CreateWorkspaceData } from "../types/workspace";

export const getWorkspaces = async () => {
    const response = await api.get("/workspaces");
    return response.data;
}

export const createWorkspace = async (data: CreateWorkspaceData) => {
    const response = await api.post("/workspaces", data);
    return response.data;
}

export const getWorkspaceById = async (workspaceId: string) => {
    const response = await api.get(`/workspaces/${workspaceId}`);
    return response.data;
}