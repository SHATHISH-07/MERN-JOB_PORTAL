import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    Briefcase,
    PanelLeft,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Profile", icon: User, path: "/profile" },
        ...(user?.role === "EMPLOYER"
            ? [{ label: "Jobs", icon: Briefcase, path: "/jobs" }]
            : []),
    ];

    return (
        <aside
            className={`h-full bg-[#181818] border-r border-white/5 flex flex-col transition-all ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Top */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
                {!collapsed && <span className="font-bold text-lg">JobPortal</span>}
                <button onClick={() => setCollapsed(!collapsed)}>
                    <PanelLeft />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-2">
                {navItems.map(({ label, icon: Icon, path }) => (
                    <NavLink
                        key={label}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${isActive ? "bg-white/10" : "hover:bg-white/5"
                            }`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        {!collapsed && label}
                    </NavLink>
                ))}
            </nav>

            {/* User */}
            <div
                onClick={() => navigate("/profile")}
                className="p-4 border-t border-white/5 cursor-pointer hover:bg-white/5"
            >
                {!collapsed ? (
                    <>
                        <div className="text-sm font-medium">{user?.email}</div>
                        <div className="text-xs text-gray-400">{user?.role}</div>
                    </>
                ) : (
                    <User />
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
