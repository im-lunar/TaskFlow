# TaskFlow

TaskFlow is a full-stack project management application inspired by tools like Trello. It allows users to create workspaces, collaborate with members, manage tasks, and organize work through a simple Kanban-style task board.

The project was built to practice and demonstrate full-stack development using TypeScript, React, Express, PostgreSQL, Prisma, and modern authentication/API patterns.

---

## Features

### Authentication

- User registration and login
- Password hashing
- JWT-based authentication
- Protected API routes
- Protected frontend routes
- Persistent authentication using local storage

### Workspaces

- Create workspaces
- View workspaces
- View workspace details
- Workspace roles:
  - Owner
  - Member
- Workspace membership management
- Workspace-specific tasks

### Workspace Invitations

Workspace owners can invite users to their workspace using their email address.

Users can:

- View pending invitations
- Accept invitations
- Reject invitations
- Automatically become workspace members after accepting an invitation

Invitation validation includes:

- Owner-only invitation permissions
- Duplicate membership checks
- Duplicate pending invitation checks
- Invitation expiration
- Email ownership verification

### Task Management

Tasks support:

- Task title
- Description
- Status
- Priority
- Creator
- Assignee
- Due date
- Created/updated timestamps

Task statuses:

```text
TODO
IN_PROGRESS
DONE
