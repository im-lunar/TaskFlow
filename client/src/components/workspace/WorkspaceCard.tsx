import type { WorkspaceListItem } from "../../types/workspace";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type WorkspaceCardProps = {
    workspace: WorkspaceListItem;
}

export function WorkspaceCard ({ workspace }: WorkspaceCardProps) {

    return (
        <div className="cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="p-5">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {workspace.name}
                    </h3>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            workspace.role === "OWNER"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {workspace.role}
                    </span>
                </div>

                <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">
                    {workspace.description || "No description provided."}
                </p>
            </div>

            <Link
                to={`/workspaces/${workspace.id}`}
                className="flex items-center justify-between border-t px-5 py-4 text-indigo-600 transition-colors hover:bg-indigo-50"
            >
                <span className="text-sm font-medium">
                    Open Workspace
                </span>

                <ArrowRight size={18} />
            </Link>
        </div>
    );
}