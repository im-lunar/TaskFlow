import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>

      <Route path="/"  />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Register />} />

      <Route path="/dashboard" element={<DashboardLayout />} >
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/workspaces/:workspaceId" element={<Workspace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;