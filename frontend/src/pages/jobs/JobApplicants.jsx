import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    getApplicantsForJob,
    updateApplicationStatus,
} from "../../api/application";
import { FileText, ChevronDown, Mail, SearchX, ArrowLeft, User } from "lucide-react";

// 🎨 Status Config
const statusConfig = {
    APPLIED: { label: "Applied", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    SHORTLISTED: { label: "Shortlisted", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
    REJECTED: { label: "Rejected", color: "text-red-400 bg-red-400/10 border-red-400/20" },
    HIRED: { label: "Hired", color: "text-green-400 bg-green-400/10 border-green-400/20" },
};

const JobApplicants = () => {
    const { jobId } = useParams();
    const token = localStorage.getItem("token");
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchApplicants = async () => {
            try {
                const res = await getApplicantsForJob(jobId, token);
                if (isMounted) {
                    setApps(res.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchApplicants();

        return () => {
            isMounted = false;
        };
    }, [jobId, token]);


    const changeStatus = async (id, newStatus) => {
        setApps((prevApps) =>
            prevApps.map((app) =>
                app._id === id ? { ...app, status: newStatus } : app
            )
        );
        try {
            await updateApplicationStatus(id, newStatus, token);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const StatusSelect = ({ currentStatus, onChange }) => (
        <div className="relative w-full md:w-40">
            <select
                value={currentStatus}
                onChange={onChange}
                className={`w-full appearance-none pl-3 pr-8 py-2.5 text-sm font-medium rounded-lg border bg-[#121212] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer ${statusConfig[currentStatus]?.color || "text-zinc-300 border-zinc-700"}`}
            >
                <option value="APPLIED">Applied</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="REJECTED">Rejected</option>
                <option value="HIRED">Hired</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );

    return (
        <div className="w-full mx-auto  sm:px-6 pb-20 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                <Link to="/employer/jobs" className="self-start sm:self-auto">
                    <button variant="ghost" size="icon" className="h-10 w-10 rounded-full  text-white  sm:bg-transparent">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Applicants</h1>
                    <p className="text-zinc-400 text-sm">Manage and review candidates</p>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-[#181818] rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : apps.length === 0 ? (
                <div className="bg-[#181818] border border-white/5 rounded-xl p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-75">
                    <div className="h-16 w-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <SearchX className="h-8 w-8 text-zinc-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No applicants yet</h3>
                </div>
            ) : (
                <>
                    {/* 📱 MOBILE VIEW (Stacked Cards) */}
                    <div className="grid gap-4 md:hidden">
                        {apps.map((app) => (
                            <div key={app._id} className="bg-[#181818] border border-white/10 rounded-xl p-4 shadow-sm space-y-4 max-w-full">
                                {/* Top Row: Avatar + Name */}
                                <div className="flex items-start gap-3 overflow-hidden">
                                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0">
                                        {app.fullName?.charAt(0) || <User className="h-5 w-5" />}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-white truncate text-base">{app.fullName || "Unknown"}</p>
                                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                                            <Mail className="h-3 w-3 shrink-0" />
                                            {/* break-all ensures long emails don't overflow */}
                                            <span className="truncate sm:break-all">{app.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Row: Date + Resume Link */}
                                <div className="flex flex-wrap items-center justify-between gap-2 text-sm pt-2 border-t border-white/5">

                                    {app.resumeUrl ? (
                                        <a
                                            href={app.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium ml-auto"
                                        >
                                            <FileText className="h-3.5 w-3.5" /> Resume
                                        </a>
                                    ) : (
                                        <span className="text-zinc-600 italic text-xs  ml-auto">No resume</span>
                                    )}
                                </div>

                                {/* Bottom Row: Status Dropdown */}
                                <div>
                                    <StatusSelect
                                        currentStatus={app.status}
                                        onChange={(e) => changeStatus(app._id, e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 💻 DESKTOP VIEW (Table) */}
                    <div className="hidden md:block bg-[#181818] border border-white/10 rounded-xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5 text-xs uppercase text-zinc-400 font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Candidate</th>
                                        <th className="px-6 py-4">Resume</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {apps.map((app) => (
                                        <tr key={app._id} className="hover:bg-white/2 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0">
                                                        {app.fullName?.charAt(0) || "U"}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-white truncate max-w-50">{app.fullName}</p>
                                                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                                                            <Mail className="h-3 w-3 shrink-0" />
                                                            <span className="truncate max-w-50">{app.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                {app.resumeUrl ? (
                                                    <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-blue-400 hover:text-blue-300 transition-colors border border-white/5 whitespace-nowrap">
                                                        <FileText className="h-4 w-4" /> View
                                                    </a>
                                                ) : <span className="text-zinc-600 text-sm italic">No resume</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusSelect
                                                    currentStatus={app.status}
                                                    onChange={(e) => changeStatus(app._id, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default JobApplicants;