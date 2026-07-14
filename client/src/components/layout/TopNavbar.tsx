function TopNavbar() {
    return (
        <header className="flex items-center justify-between py-4 px-6 border-b">
            <div className="text-lg font-semibold text-gray-900">
                Dashboard
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-700 text-lg font-semibold text-white">
                    G
                </div>
                
                <span className="text-sm font-medium text-gray-700">
                    username
                </span>
            </div>
        </header>
    )
}

export default TopNavbar;