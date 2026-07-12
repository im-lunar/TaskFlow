import { WorkspaceRole } from "../../../generated/prisma/enums.js";
import { prisma } from "../../prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { CreateTaskRequestDto, CreateTaskResponseDto, TaskDetailsDto, TaskListItemDto, UpdateTaskRequestDto } from "./task.dto.js";

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

export const updateTaskService = async (taskId: string, userId: string, data: UpdateTaskRequestDto): Promise<TaskDetailsDto> => {
    // find the task
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    // verify member is of workspace
    const membership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: task.workspaceId,
                userId
            }
        }
    });

    if (!membership) {
        throw new AppError("Workspace not found", 404);
    }

    // verify if the user is OWNER or Creator to be able to update task details
    if (membership.role !== WorkspaceRole.OWNER && task.creatorId !== userId) {
        throw new AppError("You are not authorized to update this task", 403);
    }

    // validating the assignee(only if assignee is the member of workspace)
    if (data.assigneeId !== undefined && data.assigneeId !== null) {
        const assigneeMembership = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId: task.workspaceId,
                    userId: data.assigneeId
                }
            }
        });

        if (!assigneeMembership) {
            throw new AppError(
                "Assignee must be a member of the workspace",
                400
            );
        }
    }

    // Update task
    const updatedTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            ...(data.title !== undefined && {
                title: data.title
            }),

            ...(data.description !== undefined && {
                description: data.description
            }),

            ...(data.priority !== undefined && {
                priority: data.priority
            }),

            ...(data.dueDate !== undefined && {
                dueDate: data.dueDate
            }),

            ...(data.assigneeId !== undefined && {
                assigneeId: data.assigneeId
            })
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

    const response: TaskDetailsDto = {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority,
        dueDate: updatedTask.dueDate,
        workspaceId: updatedTask.workspaceId,

        creator: {
            id: updatedTask.creator.id,
            name: updatedTask.creator.name
        },

        assignee: updatedTask.assignee
            ? {
                  id: updatedTask.assignee.id,
                  name: updatedTask.assignee.name
              }
            : null
    }

    return response;
}