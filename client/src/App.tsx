import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/"  />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Register />} />

      <Route path="/dashboard" element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
      } >
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/workspaces/:workspaceId" element={
        <ProtectedRoute>
          <Workspace />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;