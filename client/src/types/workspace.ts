export interface CreateWorkspaceData {
    name: string;
    description?: string;
}

export type WorkspaceListItem = {
    id: string;
    name: string;
    description: string | null;
    role: "OWNER" | "MEMBER";
}

export interface WorkspaceMember {
    id: string;
    name: string;
    role: string;
}

export interface WorkspaceDetail {
    id: string;
    name: string;
    description: string | null;
    role: string;
    members: WorkspaceMember[];
}