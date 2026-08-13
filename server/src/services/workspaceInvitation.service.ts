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