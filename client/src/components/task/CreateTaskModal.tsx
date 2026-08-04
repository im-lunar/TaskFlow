import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { createTasks } from "../../services/task.services";
import type { CreateTaskData } from "../../types/task";

type CreateTaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
    workspaceId: string;
    onTaskCreated: () => void;
};

function CreateTaskModal({
    isOpen,
    onClose,
    workspaceId,
    onTaskCreated,
}: CreateTaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<
        "LOW" | "MEDIUM" | "HIGH"
    >("MEDIUM");

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleCreateTask = async () => {
        if (!title.trim()) return;

        setLoading(true);

        try {
            const data: CreateTaskData = {
                title,
                description,
                priority,
            };

            await createTasks(workspaceId, data);

            resetForm();

            onTaskCreated();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={handleClose}
        >
            <div
                className="fixed inset-0 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Create Task
                    </h2>

                    <div className="mt-6 space-y-5">

                        <Input
                            label="Title"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                                placeholder="Describe the task..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
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
                                        e.target.value as
                                            | "LOW"
                                            | "MEDIUM"
                                            | "HIGH"
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                    </div>

                    <div className="mt-8 flex justify-end gap-3">

                        <button
                            onClick={handleClose}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <Button
                            type="button"
                            onClick={handleCreateTask}
                            disabled={loading || !title.trim()}
                        >
                            {loading ? "Creating..." : "Create Task"}
                        </Button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateTaskModal;