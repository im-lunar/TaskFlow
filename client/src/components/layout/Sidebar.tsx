import { LayoutDashboard, FolderKanban, LogOut, Mail } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Sidebar() {
    const { user, loading, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard", 
            icon: LayoutDashboard
        },
        {
            label: "Workspaces",
            path: "/workspaces", 
            icon: FolderKanban
        },
        {
            label: "Invitations",
            path: "/invitations",
            icon: Mail
        }
    ]

    const baseClass = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors";

    if (loading) {
    return (
        <aside className="w-64 border-r p-6">
            Loading...
        </aside>
    );
}

    return (
    <aside className="w-64 border-r flex flex-col justify-between px-4 py-6">
        <div className="flex flex-col gap-8">
            <div className="text-2xl font-bold tracking-tight text-indigo-800 pt-2">
                TaskFlow
            </div>
        
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink 
                            key={item.path} 
                            to={item.path}
                            className={({ isActive }) => 
                                `${baseClass} ${
                                    isActive
                                    ? "bg-indigo-100 text-indigo-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    )
                })}
            </nav>
        </div>
        <div className="border-t pt-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                        {user?.name}
                    </span>

                    <span className="text-sm text-gray-500">
                        {user?.email}
                    </span>
                    
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>
    </aside>
    )
}

export default Sidebar;