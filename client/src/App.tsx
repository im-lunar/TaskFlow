import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      <Route path="/"  />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/workspaces/:workspaceId" element={<Workspace />} />

       <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;