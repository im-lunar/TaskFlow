
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import type { Task, TaskStatus } from "../../types/task";
import TaskCard from "./TaskCard";

type TaskColumnProps = {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
};

function TaskColumn({
    title,
    status,
    tasks,
    onTaskClick,
}: TaskColumnProps) {
    const { ref, isDropTarget } = useDroppable({
        id: status,
        type: "column",
        accept: "task",
        collisionPriority: CollisionPriority.Low,
    });

    return (
        <div
            ref={ref}
            className={`min-h-125 rounded-xl border p-5 transition-colors ${
                isDropTarget
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 bg-white"
            }`}
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                </h2>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                    {tasks.length}
                </span>
            </div>

            <div className="min-h-24 space-y-3">
                {tasks.length === 0 ? (
                    <p className="py-6 text-center text-sm text-gray-400">
                        Drop a task here
                    </p>
                ) : (
                    tasks.map((task, index) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            status={status}
                            index={index}
                            onClick={() => onTaskClick(task)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TaskColumn;
