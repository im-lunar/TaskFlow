import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import { useState } from "react";

function DashboardLayout() {
    const [user, setUser] = useState();

    return (
    <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 flex-col">
            <TopNavbar />

            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <Outlet />
            </div>
        </main>
    </div>
    )
}

export default DashboardLayout;