import { useState } from "react";
import { X, Mail } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import { createInvitation } from "../../services/invitation.services";

type InviteMemberModalProps = {
    isOpen: boolean;
    onClose: () => void;
    workspaceId: string;
};

function InviteMemberModal({
    isOpen,
    onClose,
    workspaceId,
}: InviteMemberModalProps) {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (!isOpen) return null;

    const resetForm = () => {
        setEmail("");
        setError("");
        setSuccess("");
    };

    const handleClose = () => {
        if (loading) return;

        resetForm();
        onClose();
    };

    const handleInvite = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError("Please enter an email address.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await createInvitation(
                workspaceId,
                trimmedEmail
            );

            setSuccess("Invitation sent successfully.");
            setEmail("");

        } catch (err: any) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Failed to send invitation."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Invite Member
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Invite someone to join this workspace.
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}

                <div className="mt-6">

                    <Input
                        label="Email"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                            setSuccess("");
                        }}
                    />

                </div>

                {/* Error */}

                {error && (
                    <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Success */}

                {success && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                        <Mail size={16} />
                        {success}
                    </div>
                )}

                {/* Actions */}

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <Button
                        type="button"
                        onClick={handleInvite}
                        disabled={loading || !email.trim()}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Invite"
                        }
                    </Button>

                </div>

            </div>
        </div>
    );
}

export default InviteMemberModal;