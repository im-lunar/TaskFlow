import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkspaceById } from "../services/workspace.services";
import type { WorkspaceDetail } from "../types/workspace";
import { WorkspaceHeader } from "../components/workspace/WorkspaceHeader";
import TaskBoard from "../components/task/TaskBoard";
import CreateTaskModal from "../components/task/CreateTaskModal";
import type { Task } from "../types/task";
import { getTasks } from "../services/task.services";

function WorkspaceDetails() {
    const { workspaceId } = useParams<{ workspaceId: string }>();

    const [workspace, setWorkspace] = useState<WorkspaceDetail | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [taskError, setTaskError] = useState("");

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
                    />
                </>
            )}

        </div>
        

    
    );
}

export default WorkspaceDetails;