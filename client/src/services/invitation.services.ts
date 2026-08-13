import api from "../api/axios";
import type { CreateInvitationResponse,GetInvitationsResponse,InvitationActionResponse } from "../types/invitation";

export const createInvitation = async (workspaceId: string, email: string): Promise<CreateInvitationResponse> => {
    const response = await api.post(
        `/workspaces/${workspaceId}/invitations`,
        { email }
    );

    return response.data;
};

export const getMyInvitations =
    async (): Promise<GetInvitationsResponse> => {
        const response = await api.get("/invitations");

        return response.data;
    };

export const acceptInvitation = async (
    invitationId: string
): Promise<InvitationActionResponse> => {
    const response = await api.patch(
        `/invitations/${invitationId}/accept`
    );

    return response.data;
};

export const rejectInvitation = async (
    invitationId: string
): Promise<InvitationActionResponse> => {
    const response = await api.patch(
        `/invitations/${invitationId}/reject`
    );

    return response.data;
};