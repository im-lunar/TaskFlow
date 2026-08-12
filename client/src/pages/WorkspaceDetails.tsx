import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkspaceById } from "../services/workspace.services";
import type { WorkspaceDetail } from "../types/workspace";
import { WorkspaceHeader } from "../components/workspace/WorkspaceHeader";
import TaskBoard from "../components/task/TaskBoard";
import CreateTaskModal from "../components/task/CreateTaskModal";
import type { Task } from "../types/task";
import { getTasks } from "../services/task.services";
import TaskDetailsModal from "../components/task/TaskDetailsModal";
import EditTaskModal from "../components/task/EditTaskModal";

function WorkspaceDetails() {
    const { workspaceId } = useParams<{ workspaceId: string }>();

    const [workspace, setWorkspace] = useState<WorkspaceDetail | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [taskError, setTaskError] = useState("");

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    type TaskModal = "details" | "edit" | null;
    const [taskModal, setTaskModal] = useState<TaskModal>(null);


    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setTaskModal("details");
    };

    const fetchWorkspace = async () => {
        if (!workspaceId) return;

        setLoading(true);
        setError("");

        try {
            const response = await getWorkspaceById(workspaceId);
            setWorkspace(response.workspace);
        } catch (err) {
            console.error(err);
            setError("Failed to load the workspace.")
        } finally {
            setLoading(false);
        }
    }

    const fetchTasks = async () => {
        if (!workspaceId) return;

        setLoadingTasks(true);
        setTaskError("");

        try{
            const response = await getTasks(workspaceId);

            setTasks(response.tasks);
        } catch (err) {
            console.error(err);
            setTaskError("Failed to load tasks.");
        } finally {
            setLoadingTasks(false);
        }
    }


    useEffect(() => {
        fetchTasks();
        fetchWorkspace();
    }, [workspaceId]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }
    

    return (
        <div className="p-8">
            {workspace && (
                <>
                    <WorkspaceHeader workspace={workspace} onCreateTask={() => setIsCreateTaskOpen(true)} />
                    <CreateTaskModal 
                        isOpen={isCreateTaskOpen}
                        onClose={() => setIsCreateTaskOpen(false)}
                        workspaceId={workspace.id}
                        onTaskCreated={fetchTasks}
                    />
                    <TaskBoard 
                        tasks={tasks}
                        loading={loadingTasks}
                        error={taskError}
                        onTaskClick={handleTaskClick}
                    />
                    <TaskDetailsModal 
                        task={selectedTask}
                        isOpen={selectedTask !== null}
                        onClose={() => setSelectedTask(null)}
                        onEdit={() => setTaskModal("edit")}
                        onTaskUpdated={fetchTasks}
                        onTaskDeleted={fetchTasks}
                     />
                     <EditTaskModal
                        task={selectedTask}
                        members={workspace.members}
                        isOpen={taskModal === "edit"}
                        onClose={() => setTaskModal(null)}
                        onTaskUpdated={fetchTasks}
                    />
                </>
            )}

        </div>
        

    
    );
}

export default WorkspaceDetails;