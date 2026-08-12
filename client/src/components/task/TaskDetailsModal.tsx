import { X, Calendar, User, Flag } from "lucide-react";
import type { Task, TaskStatus } from "../../types/task";
import { deleteTask, updateTaskStatus } from "../../services/task.services";
import { useState } from "react";

type TaskDetailsModalProps = {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
    onTaskUpdated: () => void;
    onTaskDeleted: () => void;
};

function TaskDetailsModal ({ task, isOpen, onClose, onEdit, onTaskUpdated, onTaskDeleted }: TaskDetailsModalProps) {
    
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    if (!isOpen || !task) {
        return null;
    }

    const priorityStyles = {
        LOW: "bg-green-100 text-green-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        HIGH: "bg-red-100 text-red-700"
    }

    const statusStyle = {
        TODO: "bg-gray-100 text-gray-700",
        IN_PROGRESS: "bg-blue-100 text-blue-700",
        DONE: "bg-green-100 text-green-700"
    }

    const formatDate = (date?: string|null) => {
        if (!date) return "No due date";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    const handleStatusChange = async (status: TaskStatus) => {
        if (status === task.status) return;

        try {
            await updateTaskStatus(task.id, status);
            onTaskUpdated();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteTask = async () => {
        if (!task) return;

        setDeleteLoading(true);
        setDeleteError("");

        try {
            await deleteTask(task.id);

            onTaskDeleted();
            onClose();
        } catch (error) {
            console.error(error);
            setDeleteError("Failed to delete task.")
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            
            <div
                className="w-full max-w-2xl rounded-xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-start justify-between border-b px-6 py-5">

                    <div>
                        <p className="text-sm text-gray-500">
                            Task Details
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-900">
                            {task.title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Content */}
                <div className="space-y-6 px-6 py-6">

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">
                            Description
                        </h3>

                        <p className="mt-2 leading-6 text-gray-600">
                            {task.description || "No description provided."}
                        </p>
                    </div>

                    {/* Status + Priority */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                Status
                            </p>

                            <select
                                value={task.status}
                                onChange={(e) =>
                                    handleStatusChange(
                                        e.target.value as TaskStatus
                                    )
                                }
                                className={`
                                    mt-2 rounded-lg border px-3 py-2
                                    text-sm font-medium outline-none
                                    ${statusStyle[task.status]}
                                `}
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                Priority
                            </p>

                            <span
                                className={`
                                    mt-2 inline-flex items-center gap-1
                                    rounded-full px-3 py-1
                                    text-sm font-medium
                                    ${priorityStyles[task.priority]}
                                `}
                            >
                                <Flag size={14} />
                                {task.priority}
                            </span>
                        </div>

                    </div>

                    {/* Creator + Assignee */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                Created By
                            </p>

                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                <User size={16} />
                                {task.creator.name}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-700">
                                Assigned To
                            </p>

                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                <User size={16} />

                                {task.assignee?.name || "Unassigned"}
                            </div>
                        </div>

                    </div>

                    {/* Due Date */}
                    <div>

                        <p className="text-sm font-semibold text-gray-700">
                            Due Date
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={16} />

                            {formatDate(task.dueDate)}
                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-between border-t px-6 py-4">
                    <button
                        onClick={() => {
                            setDeleteError("");
                            setIsDeleteConfirmOpen(true);
                        }}
                        className="rounded-lg border border-red-200 px-5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        Delete Task
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={onEdit}
                            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                        >
                            Edit Task
                        </button>

                        <button
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Close
                        </button>
                    </div>
                </div>

            
            </div>

            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
                    <div
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold text-gray-900">
                            Delete Task?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Are you sure you want to delete this task?
                            This action cannot be undone.
                        </p>

                        {deleteError && (
                            <p className="mt-3 text-sm text-red-600">
                                {deleteError}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteConfirmOpen(false)}
                                disabled={deleteLoading}
                                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDeleteTask}
                                disabled={deleteLoading}
                                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {deleteLoading
                                    ? "Deleting..."
                                    : "Delete Task"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default TaskDetailsModal;