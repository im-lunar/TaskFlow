import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type {
    Task,
    UpdateTaskData,
    TaskPriority,
} from "../../types/task";

import type { WorkspaceMember } from "../../types/workspace";

import { updateTask } from "../../services/task.services";
import Button from "../common/Button";
import Input from "../common/Input";

type EditTaskModalProps = {
    task: Task | null;
    members: WorkspaceMember[];
    isOpen: boolean;
    onClose: () => void;
    onTaskUpdated: () => void;
};

function EditTaskModal({
    task,
    members,
    isOpen,
    onClose,
    onTaskUpdated,
}: EditTaskModalProps) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] =
        useState<TaskPriority>("MEDIUM");

    const [dueDate, setDueDate] = useState("");
    const [assigneeId, setAssigneeId] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /*
     * Populate the form whenever a different task
     * is selected.
     */
    useEffect(() => {
        if (!task) return;

        setTitle(task.title);
        setDescription(task.description || "");
        setPriority(task.priority);

        setDueDate(
            task.dueDate
                ? task.dueDate.slice(0, 10)
                : ""
        );

        setAssigneeId(
            task.assignee?.id || ""
        );

        setError("");
    }, [task]);

    if (!isOpen || !task) {
        return null;
    }

    const handleSubmit = async () => {
        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data: UpdateTaskData = {
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate: dueDate || null,
                assigneeId: assigneeId || null,
            };

            await updateTask(task.id, data);

            onTaskUpdated();
            onClose();

        } catch (err) {
            console.error(err);
            setError("Failed to update task.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>
                        <p className="text-sm text-gray-500">
                            Task
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Edit Task
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}

                <div className="space-y-5 px-6 py-6">

                    <Input
                        label="Title"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Priority
                        </label>

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(
                                    e.target.value as TaskPriority
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        >
                            <option value="LOW">
                                Low
                            </option>

                            <option value="MEDIUM">
                                Medium
                            </option>

                            <option value="HIGH">
                                High
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Assign To
                        </label>

                        <select
                            value={assigneeId}
                            onChange={(e) =>
                                setAssigneeId(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        >
                            <option value="">
                                Unassigned
                            </option>

                            {members.map((member) => (
                                <option
                                    key={member.id}
                                    value={member.id}
                                >
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>

                </div>

            </div>
        </div>
    );
}

export default EditTaskModal;