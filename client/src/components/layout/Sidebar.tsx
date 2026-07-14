import { LayoutDashboard, FolderKanban } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {

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
        }
    ]

    const baseClass = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors";

    const user = {
        name: "Guest User",
        subtitle: "Welcome!"
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
                    {user.name.charAt(0)}
                </div>

                <div className="flex flex-col">
                    <span className="font-medium text-grey-900">
                        {user.name}
                    </span>

                    <span className="text-sm text-gray-500">
                        {user.subtitle}
                    </span>
                </div>
            </div>
        </div>
    </aside>
    )
}

export default Sidebar;