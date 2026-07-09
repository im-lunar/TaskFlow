import type { WorkspaceRole } from "../../../generated/prisma/enums.js"

export interface CreateWorkspaceResponseDto {
    id: string,
    name: string,
    description: string | null,
    ownerId: string
}

export interface WorkspaceListItemDto {
    id: string,
    name: string,
    description: string | null,
    role: WorkspaceRole
}

export interface InviteMemberRequestDto {
    email: string
}

export interface InviteMemberResponseDto {
    id: string,
    name: string,
    email: string,
    role: WorkspaceRole
}