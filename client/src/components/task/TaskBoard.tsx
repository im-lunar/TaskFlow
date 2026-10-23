
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";

import TaskColumn from "./TaskColumn";
import type { Task, TaskStatus } from "../../types/task";
import { updateTaskStatus } from "../../services/task.services";

type TaskBoardProps = {
    tasks: Task[];
    loading: boolean;
    error: string;
    onTaskClick: (task: Task) => void;
    onTaskStatusUpdated: () => Promise<void> | void;
};

const statuses: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

function TaskBoard({
    tasks,
    loading,
    error,
    onTaskClick,
    onTaskStatusUpdated,
}: TaskBoardProps) {
    const [statusError, setStatusError] = useState("");

    if (loading) {
        return (
            <div className="mt-8">
                <p className="text-gray-500">Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8">
                <p className="text-red-600">{error}</p>
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

    const handleDragEnd = async (event: any) => {
        if (event.canceled) return;

        const { source, target } = event.operation;

        if (!source || !target || !isSortable(source)) return;

        const taskId = String(source.id);
        const task = tasks.find((item) => item.id === taskId);

        if (!task) return;

        const targetId = String(target.id);

        // Dropping on the column itself, including an empty column.
        let newStatus: TaskStatus | undefined;

        if (statuses.includes(targetId as TaskStatus)) {
            newStatus = targetId as TaskStatus;
        } else if (
            source.group != null &&
            statuses.includes(source.group as TaskStatus)
        ) {
            // dnd-kit updates the sortable item's group when it
            // moves between columns.
            newStatus = source.group as TaskStatus;
        } else {
            const targetTask = tasks.find(
                (item) => item.id === targetId
            );
            newStatus = targetTask?.status;
        }

        if (!newStatus || newStatus === task.status) return;

        setStatusError("");

        try {
            await updateTaskStatus(taskId, newStatus);
            await onTaskStatusUpdated();
        } catch (err) {
            console.error("Failed to update task status:", err);
            setStatusError(
                "Could not move the task. Your changes have been refreshed."
            );

            try {
                await onTaskStatusUpdated();
            } catch (refreshError) {
                console.error("Failed to refresh tasks:", refreshError);
            }
        }
    };

    return (
        <div className="mt-8">
            {statusError && (
                <p role="alert" className="mb-4 text-sm text-red-600">
                    {statusError}
                </p>
            )}

            <DragDropProvider onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <TaskColumn
                        title="To Do"
                        status="TODO"
                        tasks={taskByStatus.TODO}
                        onTaskClick={onTaskClick}
                    />

                    <TaskColumn
                        title="In Progress"
                        status="IN_PROGRESS"
                        tasks={taskByStatus.IN_PROGRESS}
                        onTaskClick={onTaskClick}
                    />

                    <TaskColumn
                        title="Done"
                        status="DONE"
                        tasks={taskByStatus.DONE}
                        onTaskClick={onTaskClick}
                    />
                </div>
            </DragDropProvider>
        </div>
    );
}

export default TaskBoard;
