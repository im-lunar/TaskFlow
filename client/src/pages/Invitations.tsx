import { useEffect, useState } from "react";
import { getMyInvitations,acceptInvitation,rejectInvitation } from "../services/invitation.services";
import type { WorkspaceInvitationListItem } from "../types/invitation";

function Invitations() {
    const [invitations, setInvitations] = useState<
        WorkspaceInvitationListItem[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchInvitations = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getMyInvitations();

            setInvitations(response.invitations);
        } catch (err) {
            console.error(err);
            setError("Failed to load invitations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, []);

    const handleAccept = async (invitationId: string) => {
        try {
            await acceptInvitation(invitationId);

            setInvitations((current) =>
                current.filter(
                    (invitation) => invitation.id !== invitationId
                )
            );
        } catch (err) {
            console.error(err);
            setError("Failed to accept invitation.");
        }
    };

    const handleReject = async (invitationId: string) => {
        try {
            await rejectInvitation(invitationId);

            setInvitations((current) =>
                current.filter(
                    (invitation) => invitation.id !== invitationId
                )
            );
        } catch (err) {
            console.error(err);
            setError("Failed to reject invitation.");
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <p className="text-gray-500">
                    Loading invitations...
                </p>
            </div>
        );
    }

    return (
        <div className="p-8">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Invitations
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Workspace invitations you've received.
                </p>
            </div>

            {error && (
                <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {invitations.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        No invitations
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        You don't have any pending workspace invitations.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {invitations.map((invitation) => (
                        <div
                            key={invitation.id}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-6">

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {invitation.workspace.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {invitation.workspace.description ||
                                            "No description provided."}
                                    </p>

                                    <p className="mt-4 text-sm text-gray-600">
                                        Invited by{" "}
                                        <span className="font-medium text-gray-900">
                                            {invitation.invitedBy.name}
                                        </span>
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {invitation.invitedBy.email}
                                    </p>
                                </div>

                                <div className="flex shrink-0 gap-3">
                                    <button
                                        onClick={() =>
                                            handleReject(invitation.id)
                                        }
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Reject
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleAccept(invitation.id)
                                        }
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                                    >
                                        Accept
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default Invitations;