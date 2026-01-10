import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/application";
import { MapPin, Briefcase, Building2, CalendarClock, SearchX } from "lucide-react";

// 🎨 Configuration for Status Styles
const statusStyles = {
    APPLIED: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
        label: "Applied"
    },
    SHORTLISTED: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        border: "border-yellow-500/20",
        label: "Shortlisted"
    },
    REJECTED: {
        bg: "bg-red-500/10",
        text: "text-red-400",
        border: "border-red-500/20",
        label: "Rejected"
    },
    HIRED: {
        bg: "bg-green-500/10",
        text: "text-green-400",
        border: "border-green-500/20",
        label: "Hired"
    },
};

const AppliedJobs = () => {
    const token = localStorage.getItem("token");
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = () => {
        getMyApplications(token)
            .then((res) => {
                setApps(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchApplications();
        // Poll every 15 seconds for status updates
        const interval = setInterval(fetchApplications, 15000);
        return () => clearInterval(interval);
    }, [token,]);

    // 🔄 Loading Skeleton
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-[#181818] border border-white/5 rounded-xl p-5 space-y-3 animate-pulse">
                        <div className="h-6 w-1/3 bg-zinc-800 rounded" />
                        <div className="h-4 w-1/4 bg-zinc-800 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Applied Jobs</h1>
                    <p className="text-zinc-400 mt-1">Track the status of your current applications</p>
                </div>
                <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-center text-sm font-medium">
                    {apps.length} Applications
                </span>
            </header>

            {apps.length === 0 ? (
                // 📭 Empty State
                <div className="text-center py-20 bg-[#181818] rounded-xl border border-white/5 dashed border-zinc-700">
                    <SearchX className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white">No applications yet</h3>
                    <p className="text-zinc-400 max-w-sm mx-auto mt-2">
                        Start exploring jobs and apply to positions that match your skills.
                    </p>
                </div>
            ) : (
                // 📋 Jobs List
                <div className="grid gap-4">
                    {apps.map((app) => {
                        const style = statusStyles[app.status] || statusStyles.APPLIED;

                        return (
                            <div
                                key={app._id}
                                className="group relative bg-[#181818] border border-white/5 hover:border-white/10 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    {/* Left Content */}
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between md:hidden">
                                            <StatusBadge style={style} />
                                        </div>

                                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                            {app.jobId.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="w-4 h-4" />
                                                {/* Assuming company name exists, otherwise fallback */}
                                                <span>{app.jobId.company || "Tech Company"}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                <span>{app.jobId.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="w-4 h-4" />
                                                <span>{app.jobId.jobType}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CalendarClock className="w-4 h-4" />
                                                <span>Applied </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Content (Status Badge) */}
                                    <div className="hidden md:block shrink-0">
                                        <StatusBadge style={style} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// Sub-component for clean code
const StatusBadge = ({ style }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${style.bg} ${style.text} ${style.border} flex items-center gap-1.5 w-fit`}>
        <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 bg-current`}></span>
        </span>
        {style.label}
    </span>
);

export default AppliedJobs;