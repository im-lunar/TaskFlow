import { WorkspaceRole } from "../../../generated/prisma/enums.js";
import { prisma } from "../../prisma.js"
import { AppError } from "../../utils/AppError.js";
import type { CreateWorkspaceResponseDto, WorkspaceListItemDto } from "./workspace.dto.js";

export const createWorkspaceService = (userId:string, name:string, description?:string): Promise<CreateWorkspaceResponseDto> => {
    return prisma.$transaction(async (tx) => {

    const workspace = await tx.workspace.create({
        data: {
            name,
            description: description?.trim() || null,
            ownerId: userId
        }
    }) ;

    await tx.workspaceMember.create({
        data: {
            workspaceId: workspace.id,
            userId,
            role: WorkspaceRole.OWNER
        }
    });

    return {
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        ownerId: workspace.ownerId
    }

    });
}

export const getWorkspacesService = async (userId: string): Promise<WorkspaceListItemDto[]> => {

    const memberships = await prisma.workspaceMember.findMany({
        where: {
            userId
        },
        include: {
            workspace: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            }
        }
    });

    return memberships.map((memberships) => ({
        id: memberships.workspace.id,
        name: memberships.workspace.name,
        description: memberships.workspace.description,
        role: memberships.role
    }));
}


export const getWorkspaceByIdService = async (userId: string, workspaceId: string) => {
    const membership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId
            }
        }
    });

    if (!membership) {
        throw new AppError("Workspace not found", 404);
    }

    const workspace = await prisma.workspace.findUnique({
        where: {
            id: workspaceId
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            }
        }
    });

    if (!workspace) {
        throw new AppError("Workspace not found", 404);
    }

    return {
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        role: membership.role,
        members : workspace.members.map((member) => ({
            id: member.userId,
            name: member.user.name,
            email: member.user.email,
            role: member.role
        }))
    }
}