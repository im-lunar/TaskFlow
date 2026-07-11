import { prisma } from "../../prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { CreateTaskRequestDto, CreateTaskResponseDto } from "./task.dto.js";

export const createTaskService = async (
    workspaceId:string,
    currentUserId: string,
    data: CreateTaskRequestDto
): Promise<CreateTaskResponseDto> => {
    // verify if the user is a member of workspace
    const membership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: currentUserId
            }
        }
    });

    if (!membership) {
        throw new AppError("Workspace not found", 404);
    }

    // validate assignee (if provided)
    if (data.assigneeId) {
        const assigneeMembership = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId: data.assigneeId
                }
            }
        });

        if (!assigneeMembership) {
            throw new AppError("Assignee must be a member of the workspace", 400);
        }
    }

    // Create Task
    const task = await prisma.task.create({
        data: {
            title: data.title,

            ...(data.description && {
                description: data.description
            }),
            ...(data.priority && {
                priority: data.priority 
            }),
            ...(data.dueDate && {
                dueDate: data.dueDate
            }),
            ...(data.assigneeId && {
                assigneeId: data.assigneeId
            }),

            creatorId: currentUserId,
            workspaceId
        }, 
        include: {
            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

    const response: CreateTaskResponseDto = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        workspaceId: task.workspaceId,
        creator: task.creator,
        assignee: task.assignee
    }

    return response;
}