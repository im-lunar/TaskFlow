export type InvitationStatus =
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED"
    | "EXPIRED";

export interface WorkspaceInvitation {
    id: string;
    workspaceId: string;
    invitedById: string;
    email: string;
    status: InvitationStatus;
    expiresAt: string;
    createdAt: string;
}

export interface WorkspaceInvitationListItem {
    id: string;
    workspaceId: string;
    email: string;
    status: InvitationStatus;
    expiresAt: string;
    createdAt: string;

    workspace: {
        id: string;
        name: string;
        description: string | null;
    };

    invitedBy: {
        id: string;
        name: string;
        email: string;
    };
}

export interface CreateInvitationResponse {
    message: string;
    invitation: WorkspaceInvitation;
}

export interface GetInvitationsResponse {
    invitations: WorkspaceInvitationListItem[];
}

export interface InvitationActionResponse {
    message: string;
    invitation?: WorkspaceInvitation;
    membership?: {
        id: string;
        workspaceId: string;
        userId: string;
        role: "MEMBER" | "OWNER";
    };
}