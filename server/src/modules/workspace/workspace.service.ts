import { WorkspaceRole } from "../../../generated/prisma/enums.js";
import { prisma } from "../../prisma.js"
import { AppError } from "../../utils/AppError.js";
import type { CreateWorkspaceResponseDto, InviteMemberResponseDto, WorkspaceListItemDto } from "./workspace.dto.js";

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
                            name: true
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
            id: member.user.id,
            name: member.user.name,
            role: member.role
        }))
    }
}

export const inviteMemberService = async (email: string, workspaceId: string, ownerId: string): Promise<InviteMemberResponseDto> => {

    // verifying if curren user belongs to workspace
    const currentUserMembership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: ownerId
            }
        }
    });

    if (!currentUserMembership) {
        throw new AppError("Workspace not found", 404);
    }

    // Verify current user is OWNER
    if (currentUserMembership.role !== WorkspaceRole.OWNER) {
        throw new AppError("Only workspace owner can invite members", 403);
    }

    // Find user by emai
    const invitedUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!invitedUser) {
        throw new AppError("User not found", 404);
    }

    // Prevent self invite
    if (invitedUser.id === ownerId) {
        throw new AppError("You are already a member of this workspace", 400);
    }

    // Check if already a member
    const existingMembership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: invitedUser.id
            }
        }
    });

    if (existingMembership) {
        throw new AppError("User is already a member of this workspace", 409);
    }

    // Create membership
    const newMember = await prisma.workspaceMember.create({
        data: {
            workspaceId,
            userId: invitedUser.id,
            role: WorkspaceRole.MEMBER
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

    return {
        id: newMember.user.id,
        name: newMember.user.name,
        email: newMember.user.email,
        role: newMember.role
    }
}

export const removeMemberService = async (memberId: string, workspaceId: string, currentUserId: string) => {
    // verify the current user belongs to workspace
    const currentUserMembership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: currentUserId
            }
        }
    });

    if (!currentUserMembership) {
        throw new AppError("Workspace not found", 404)
    }

    // verify if the currentUser is the owner
    if (currentUserMembership.role !== WorkspaceRole.OWNER) {
        throw new AppError("Only workspace owner can remove members", 403);
    }

    // prevent owner from removing themselves
    if (memberId === currentUserId) {
        throw new AppError("Workspace owner cannot remove themselves", 400);
    }

    // check if the user that has to be removed is the member of workspace
    const targetedMember = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: memberId
            }
        }
    });

    if (!targetedMember) {
        throw new AppError("Member not found", 404);
    }

    // remove member
    await prisma.workspaceMember.delete({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: memberId
            }
        }
    });
    
}