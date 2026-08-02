import Input from "../common/Input";
import Button from "../common/Button";
import { useState } from "react";
import { createWorkspace } from "../../services/workspace.services";

type CreateWorkspaceModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onWorkspaceCreated: () => void;
};

export function CreateWorkspaceModal ({isOpen, onClose, onWorkspaceCreated}: CreateWorkspaceModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateWorkspace = async () => {
        if (!name.trim()) return;

        setLoading(true);

        try {
            await createWorkspace({name, description});

            setName("");
            setDescription("");

            onClose();

            await onWorkspaceCreated();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
        >
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Create Workspace
                    </h2>

                    <div className="mt-6 space-y-5">
                         <Input
                            label="Workspace Name"
                            placeholder="e.g. Final Year Project"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your workspace..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <Button 
                            type="button"
                            onClick={handleCreateWorkspace}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Workspace"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}