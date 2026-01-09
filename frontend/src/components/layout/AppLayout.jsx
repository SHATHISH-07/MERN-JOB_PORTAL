import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ children }) => {
    return (
        <div className="h-screen flex bg-[#121212] text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 custom-scrollbar overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
