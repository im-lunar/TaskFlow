import { z } from "zod";
import { TaskPriority } from "../../../generated/prisma/enums.js";

export const taskSchema = z.object({
    title: z.string().trim().min(3, "Task title must be at least 3 characters").max(100, "Task title cannot exceed 100 characters"),
    description: z.string().trim().max(500, "Description cannot exceed 500 characters").optional(),
    priority: z.enum(TaskPriority).optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.uuid().optional()
});