import { useAuth } from "../../hooks/useAuth";


function TopNavbar() {
    
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <header className="flex items-center justify-between py-4 px-6 border-b bg-white">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </header>
        );
    }

    return (
        <header className="flex items-center justify-end py-4 px-6 border-b bg-white">
            
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                        {user?.name}
                    </span>

                    <span className="text-xs text-gray-500">
                        {user?.email}
                    </span>
                </div>
            </div>
        </header>
    )
}

export default TopNavbar;