import TaskColumn from "./TaskColumn";
import type { Task } from "../../types/task";

type TaskBoardProps = {
    tasks: Task[];
    loading: boolean;
    error: string;
};

function TaskBoard({
    tasks,
    loading,
    error,
}: TaskBoardProps) {
    if (loading) {
        return (
            <div className="mt-8">
                <p className="text-gray-500">
                    Loading tasks...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8">
                <p className="text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    const taskByStatus = {
        TODO: tasks.filter((task) => task.status === "TODO"),
        IN_PROGRESS: tasks.filter(
            (task) => task.status === "IN_PROGRESS"
        ),
        DONE: tasks.filter((task) => task.status === "DONE"),
    };

    return (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <TaskColumn
                title="To Do"
                tasks={taskByStatus.TODO}
            />

            <TaskColumn
                title="In Progress"
                tasks={taskByStatus.IN_PROGRESS}
            />

            <TaskColumn
                title="Done"
                tasks={taskByStatus.DONE}
            />
        </div>
    );
}

export default TaskBoard;