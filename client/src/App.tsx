import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import WorkspaceDetails from "./pages/WorkspaceDetails";

function App() {
  return (
    <Routes>

            {/* Redirect root */}
            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/workspaces"
                    element={<Workspace />}
                />

                <Route
                    path="/workspaces/:workspaceId"
                    element={<WorkspaceDetails />}
                />
            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
  );
}

export default App;