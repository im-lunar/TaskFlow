import { z } from "zod";
import { TaskPriority, TaskStatus } from "../../../generated/prisma/enums.js";

export const taskSchema = z.object({
    title: z.string().trim().min(3, "Task title must be at least 3 characters").max(100, "Task title cannot exceed 100 characters"),
    description: z.string().trim().max(500, "Description cannot exceed 500 characters").optional(),
    priority: z.enum(TaskPriority).optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.uuid().nullable().optional()
}).refine(
    (data) =>
        data.title !== undefined ||
        data.description !== undefined ||
        data.priority !== undefined ||
        data.dueDate !== undefined ||
        data.assigneeId !== undefined,
    {
        message: "At least one field must be provided for update"
    }
);

export const UpdateTaskStatusSchema = z.object({
    status: z.enum(TaskStatus)
});