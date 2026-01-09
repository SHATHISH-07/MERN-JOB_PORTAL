import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    Briefcase,
    PanelLeft,
    Search,
    Menu,
    X
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    if (!user) return null;

    const navItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            label: "Profile",
            icon: User,
            path: "/profile",
        },
        ...(user.role === "JOB_SEEKER"
            ? [
                {
                    label: "Browse Jobs",
                    icon: Search,
                    path: "/jobs",
                },
            ]
            : [
                {
                    label: "My Jobs",
                    icon: Briefcase,
                    path: "/employer/jobs",
                },
            ]),
    ];

    return (
        <>

            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-zinc-800 rounded-md text-white border border-zinc-700 shadow-lg"
            >
                <Menu className="w-5 h-5" />
            </button>


            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}


            <aside
                className={`
                    fixed md:sticky top-0 left-0 z-50 h-screen bg-[#181818] border-r border-white/5 flex flex-col 
                    transition-all duration-300 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                    ${collapsed ? "md:w-20" : "md:w-64 w-64"}
                `}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
                    {(!collapsed || mobileOpen) && (
                        <span className="font-bold text-lg tracking-tight text-white">
                            JobPortal
                        </span>
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden md:block p-2 rounded-md text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <PanelLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="md:hidden p-2 rounded-md text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map(({ label, icon: Icon, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                }`
                            }
                        >
                            {/* FIX: Ensure Icon is used here */}
                            <Icon className="w-5 h-5  shrink-0" />

                            {(mobileOpen || !collapsed) && (
                                <span className="fade-in">{label}</span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Footer */}
                <div
                    onClick={() => navigate("/profile")}
                    className="p-4 border-t border-white/5 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                >
                    {(mobileOpen || !collapsed) ? (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-zinc-300" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                    {user.email}
                                </div>
                                <div className="text-xs text-zinc-500 truncate">
                                    {user.role === "JOB_SEEKER" ? "Job Seeker" : "Employer"}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center" title={user.email}>
                            <User className="w-5 h-5 text-zinc-400" />
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;