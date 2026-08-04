import type { Task } from "../../types/task";
import TaskCard from "./TaskCard";

type TaskColumnProps = {
    title: string;
    tasks: Task[];
}

function TaskColumn({ title, tasks }: TaskColumnProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 min-h-125">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                </h2>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                    {tasks.length}
                </span>
            </div>

            <div className="space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-sm text-gray-400">No tasks</p>
                ): (
                    tasks.map((task) => (
                        <TaskCard 
                            key={task.id}
                            task={task}
                        />
                    ))
                )}

            </div>
        </div>
    )
}

export default TaskColumn;