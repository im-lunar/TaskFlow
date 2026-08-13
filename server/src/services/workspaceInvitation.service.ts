import { prisma } from "../prisma.js"
import { AppError } from "../utils/AppError.js";


export const createWorkspaceInvitationService =  async (workspaceId: string, userId: string, email: string) => {
    // 1. check if inviter is the member of workspace
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

    // 2. only workspace owner can invite user
    if (membership.role !== "OWNER") {
        throw new AppError("Only the workspace owner can invite members",403);
    }

    // 3. Check whether the email belongs to an existing member
    const existingUser = await prisma.user.findUnique({
        where: {
            email
            }
    });

    if (existingUser) {
        const existingMembership = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId: existingUser.id
                }
            }
        });
    
        if (existingMembership) {
            throw new AppError("User is already a member of this workspace", 409);
        }
    }

    // 4. Check for an existing pending invitation
    const existingInvitation = await prisma.workspaceInvitation.findUnique({
        where: {
            workspaceId_email: {
                workspaceId,
                email
            }
        }
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    if (existingInvitation) {
        if (existingInvitation.status === "PENDING") {
            throw new AppError("An invitation has already been sent to this email", 409);
        }

        const invitation = await prisma.workspaceInvitation.update({
            where: {
                id: existingInvitation.id
            },
            data: {
                invitedById: userId,
                status: "PENDING",
                expiresAt
            }
        });

        return invitation;
    }

    const invitation = await prisma.workspaceInvitation.create({
        data: {
            workspaceId,
            invitedById: userId,
            email,
            expiresAt
        }
    });

    return invitation;
}

export const acceptWorkspaceInvitationService = async (invitationId: string, userId: string) => {
    // 1. Get the current user
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // 2. Find the invitation
    const invitation = await prisma.workspaceInvitation.findUnique({
        where: {
            id: invitationId
        }
    });

    if (!invitation) {
        throw new AppError("Invitation not found", 404);
    }

    // 3. Check invitation status
    if (invitation.status !== "PENDING") {
        throw new AppError("This invitation is no longer active", 400);
    }

    // 4. Check expiration
    if (invitation.expiresAt < new Date()) {
        await prisma.workspaceInvitation.update({
            where: {
                id: invitation.id
            },
            data: {
                status: "EXPIRED"
            }
        });

        throw new AppError("This invitation has expired", 400);
    }

    // 5. Make sure the invitation belongs to this user
    if (user.email.toLowerCase() !== invitation.email.toLowerCase()) {
        throw new AppError("This invitation was not sent to your email address", 403);
    }

    // 6. Check whether user is already a member
    const existingMembership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: invitation.workspaceId,
                userId
            }
        }
    });

    if (existingMembership) {
        throw new AppError("You are already a member of this workspace", 409);
    }

    // 7. Create membership + accept invitation atomically

    const result = await prisma.$transaction(async (tx) => {
        const membership = await tx.workspaceMember.create({
            data: {
                workspaceId: invitation.workspaceId,
                userId,
                role: "MEMBER"
            }
        });

        const updateInvitation = await tx.workspaceInvitation.update({
            where: {
                id: invitation.id
            },
            data: {
                status: "ACCEPTED"
            }
        });

        return {
            membership,
            invitation: updateInvitation
        }
    });

    return result;
}

export const rejectWorkspaceInvitationService = async (invitationId: string, userId: string) => {
    
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const invitation = await prisma.workspaceInvitation.findUnique({
        where: {
            id: invitationId
        }
    });

    if (!invitation) {
        throw new AppError("Invitation not found", 404);
    }

    if (invitation.status !== "PENDING") {
        throw new AppError("This invitation is no longer active", 400);
    }

    if (user.email.toLowerCase() !== invitation.email.toLowerCase()) {
        throw new AppError("This invitation was not sent to your email address", 403);
    }

    const updateInvitation = await prisma.workspaceInvitation.update({
        where: {
            id: invitation.id
        },
        data: {
            status: "REJECTED"
        }
    });

    return updateInvitation;
}