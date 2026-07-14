import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";

function DashboardLayout() {
    return (
    <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col">
            <TopNavbar />

            <div className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </div>
        </main>
    </div>
    )
}

export default DashboardLayout;