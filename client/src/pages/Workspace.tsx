import { WorkspaceCard } from "../components/workspace/WorkspaceCard";
import { useEffect, useState } from "react";
import type { WorkspaceListItem } from "../types/workspace";
import { getWorkspaces } from "../services/workspace.services";
import { CreateWorkspaceModal } from "../components/workspace/CreateWorkspaceModal";

function Workspace() {
    const [workspaces, setWorkspaces] = useState<WorkspaceListItem[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchWorkspaces = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getWorkspaces();

            setWorkspaces(response.workspaces);
        } catch (error) {
            console.error(error);
            setError("Failed to load workspaces.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkspaces();
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                <p className="text-gray-500">Loading workspaces...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    My Workspaces
                </h1>

                <button
                    onClick={() => setIsModalOpen(true)}
                     className="
                        rounded-lg
                        bg-indigo-500
                        px-5
                        py-2.5
                        text-white
                        font-medium
                        hover:bg-indigo-700
                        transition
                    "
                >
                    + Create Workspace
                </button>
            </div>

            {workspaces.length === 0 ? (
                <div className="rounded-xl border border-dashed mt-6 py-16 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">
                        No workspaces yet
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Create your first workspace to get started
                    </p>
                </div>
            ): (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-4">
                    {workspaces.map((workspace) => (
                        <WorkspaceCard 
                            key={workspace.id}
                            workspace={workspace}
                        />
                    ))}
                </div>
            )}

            <CreateWorkspaceModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onWorkspaceCreated={fetchWorkspaces}
            />
        </div>
    )
}

export default Workspace;