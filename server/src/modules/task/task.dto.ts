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
    };
    assignee: {
        id: string;
        name: string;
    } | null;
}

export interface TaskListItemDto {
    id: string,
    title: string,
    description: string | null,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: Date | null,

    creator: {
        id: string,
        name: string
    },
    assignee: {
        id: string,
        name: string
    } | null;
}

export interface TaskDetailsDto {
    id: string,
    title: string,
    description: string | null,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: Date | null,
    workspaceId: string,

    creator: {
        id: string,
        name: string
    },
    assignee: {
        id: string,
        name: string
    } | null
}

export interface UpdateTaskRequestDto {
    title?: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: Date,
    assigneeId?: string | null 
}

export interface UpdateTaskStatusRequestDto {
    status: TaskStatus
}