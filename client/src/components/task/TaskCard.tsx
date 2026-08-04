import {
    Calendar,
    User,
    Flag,
} from "lucide-react";

import type { Task } from "../../types/task";

type TaskCardProps = {
    task: Task;
};

function TaskCard({ task }: TaskCardProps) {

    const priorityStyles = {
        LOW: "bg-green-100 text-green-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        HIGH: "bg-red-100 text-red-700",
    };

    const formatDate = (date?: string) => {
        if (!date) return null;

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div
            className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
            "
        >

            <div className="flex items-center justify-between">

                <span
                    className={`
                        flex items-center gap-1
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        ${priorityStyles[task.priority]}
                    `}
                >
                    <Flag size={12} />
                    {task.priority}
                </span>

            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {task.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                {task.description || "No description provided."}
            </p>

            <div className="mt-5 flex items-center justify-between">

                <div className="flex items-center gap-2 text-sm text-gray-500">

                    <User size={16} />

                    <span>
                        {task.assignee?.name || "Unassigned"}
                    </span>

                </div>

                {task.dueDate && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">

                        <Calendar size={16} />

                        <span>
                            {formatDate(task.dueDate)}
                        </span>

                    </div>
                )}

            </div>

        </div>
    );
}

export default TaskCard;