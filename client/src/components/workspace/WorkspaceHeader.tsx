import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { WorkspaceDetail } from "../../types/workspace";

type WorkspaceHeaderProps = {
    workspace: WorkspaceDetail;
    onCreateTask: () => void;
};

export function WorkspaceHeader({
    workspace,
    onCreateTask,
}: WorkspaceHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="mb-8">
            <button
                onClick={() => navigate("/workspaces")}
                className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
            >
                <ArrowLeft size={18} />
                Back to Workspaces
            </button>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {workspace.name}
                        </h1>

                        <p className="mt-3 text-gray-600">
                            {workspace.description || "No description provided."}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <User
                                    size={16}
                                    className="text-indigo-500"
                                />

                                <span className="font-medium text-gray-700">
                                    {workspace.members.length}
                                </span>

                                <span>
                                    {workspace.members.length === 1
                                        ? "Member"
                                        : "Members"}
                                </span>
                            </div>

                            <span className="text-gray-300">•</span>

                            <span className="font-medium text-gray-700">
                                {workspace.role}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onCreateTask}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                        + New Task
                    </button>
                </div>
            </div>
        </div>
    );
}