import type { TaskPriority, TaskStatus } from "../../../generated/prisma/enums.js";

export interface CreateTaskRequestDto {
    title: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: Date,
    assigneeId?: string
}

export interface CreateTaskResponseDto {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date | null;
    workspaceId: string;
    creator: {
        id: string;
        name: string;
        email: string;
    };
    assignee: {
        id: string;
        name: string;
        email: string;
    } | null;
}