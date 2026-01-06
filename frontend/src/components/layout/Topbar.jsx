import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

const Topbar = () => {
    const { logout, user } = useContext(AuthContext);

    return (
        <header className="h-16 bg-[#181818] border-b border-white/5 flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold">
                {user?.role === "EMPLOYER" ? "Employer Dashboard" : "Candidate Dashboard"}
            </h1>

            <button
                onClick={logout}
                className="flex items-center gap-2 text-sm hover:text-red-400"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        </header>
    );
};

export default Topbar;
