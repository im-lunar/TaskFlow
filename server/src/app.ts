import express from "express";
import authRoutes from "./modules/auth/auth.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js";
import workspaceRoutes from "./modules/workspace/workspace.routes.js"
import taskCollectionRoutes from "./modules/task/task.collection.routes.js"
import taskRoutes from "./modules/task/task.routes.js"

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workspaces", workspaceRoutes);
app.use("/api/v1/workspaces", taskCollectionRoutes);
app.use("/api/v1", taskRoutes);
app.use(errorHandler);

export default app;