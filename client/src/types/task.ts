export type TaskStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";

export type TaskPriority =
    | "LOW"
    | "MEDIUM"
    | "HIGH";

export interface Task {
    id: string;
    title: string;
    description?: string | null;

    status: TaskStatus;
    priority: TaskPriority;

    dueDate?: string | null;

    creator: {
        id: string;
        name: string;
    };

    assignee: {
        id: string;
        name: string;
    } | null;
}

export interface CreateTaskData  {
    title: string;
    description?: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    assigneeId?: string;
    dueDate?: string;
}