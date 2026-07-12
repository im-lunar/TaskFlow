import { prisma } from "../../prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { CreateTaskRequestDto, CreateTaskResponseDto, TaskDetailsDto, TaskListItemDto } from "./task.dto.js";

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
                    name: true
                }
            },
            creator: {
                select: {
                    id: true,
                    name: true
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

export const getTasksService = async (workspaceId: string, userId: string): Promise<TaskListItemDto[]> => {
    const membership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId
            }
        }
    });

    if (!membership) {
        throw new AppError("Workspace not found", 404)
    }

    const tasks = await prisma.task.findMany({
        where: {
            workspaceId
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true
                }
            },
            assignee: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,

        creator: {
            id: task.creator.id,
            name: task.creator.name
        },
        assignee: task.assignee
            ? {
                id: task.assignee.id,
                name: task.assignee.name
            }
            : null
    }));
}

export const getTaskByIdService = async (taskId: string, userId: string) => {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true
                }
            },
            assignee: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId:{
                workspaceId: task.workspaceId,
                userId
            }
            }
    });

    if (!membership) {
        throw new AppError("Task not found", 404);
    }

    const response: TaskDetailsDto = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        workspaceId: task.workspaceId,

        creator: {
            id: task.creator.id,
            name: task.creator.name
        },

        assignee: task.assignee
            ? {
                  id: task.assignee.id,
                  name: task.assignee.name
              }
            : null
    }

    return response;

}