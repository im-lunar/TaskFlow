import { useEffect, useState } from "react";
import { FolderKanban, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWorkspaces } from "../services/workspace.services";
import type { WorkspaceListItem } from "../types/workspace";

function Dashboard() {
    const navigate = useNavigate();

    const [workspaces, setWorkspaces] = useState<WorkspaceListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await getWorkspaces();

                setWorkspaces(response.workspaces);
            } catch (err) {
                console.error(err);
                setError("Failed to load your workspaces.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaces();
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
                    <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">

            {/* Header */}

            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Here's what's happening across your workspaces.
                </p>
            </div>

            {/* Stats */}

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl border border-gray-200 bg-indigo-300 p-6 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-gray-950">
                                Workspaces
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {workspaces.length}
                            </p>
                        </div>

                        <div className="rounded-lg bg-indigo-100 p-3">
                            <FolderKanban
                                size={22}
                                className="text-indigo-600"
                            />
                        </div>

                    </div>
                </div>

            </div>

            {/* Workspaces */}

            <div className="mt-10">

                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Your Workspaces
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Workspaces you're currently a member of.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/workspaces")}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        View all
                    </button>

                </div>

                {workspaces.length === 0 ? (
                    <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                        <FolderKanban
                            size={32}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="mt-4 font-semibold text-gray-900">
                            No workspaces yet
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Create a workspace to start organizing your work.
                        </p>

                        <button
                            onClick={() => navigate("/workspaces")}
                            className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            Go to Workspaces
                        </button>

                    </div>
                ) : (
                    <div className="mt-5 grid gap-5 md:grid-cols-2">

                        {workspaces.slice(0, 6).map((workspace) => (
                            <div
                                key={workspace.id}
                                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {workspace.name}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                            {workspace.description ||
                                                "No description provided."}
                                        </p>
                                    </div>

                                    <div className="shrink-0 rounded-lg bg-indigo-100 p-2">
                                        <FolderKanban
                                            size={20}
                                            className="text-indigo-600"
                                        />
                                    </div>

                                </div>

                                <div className="mt-5 flex items-center justify-between">

                                    <span className="text-sm text-gray-500">
                                        {workspace.role}
                                    </span>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/workspaces/${workspace.id}`
                                            )
                                        }
                                        className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                    >
                                        Open
                                        <ArrowRight size={16} />
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Dashboard;