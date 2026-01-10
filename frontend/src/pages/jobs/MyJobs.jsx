import { useEffect, useState } from "react";
import { getMyJobs, deleteJob } from "../../api/job";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Pencil, Trash2, Users, Plus } from "lucide-react";

const MyJobs = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadJobs = () => {
        setLoading(true);
        getMyJobs(token)
            .then((res) => setJobs(res.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        let isMounted = true;

        const fetchJobs = async () => {
            try {
                const res = await getMyJobs(token);
                if (isMounted) {
                    setJobs(res.data);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchJobs();

        return () => {
            isMounted = false;
        };
    }, [token]);


    const remove = async (id) => {
        if (confirm("Are you sure you want to delete this job?")) {
            await deleteJob(id, token);
            loadJobs();
        }
    };

    return (
        // Added overflow-x-hidden to root
        <div className="w-full  overflow-x-hidden mx-auto px-4 sm:px-6 pb-20 space-y-6">
            {/* Header - Stacks on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <h1 className="text-2xl font-bold text-white">My Job Listings</h1>
                <button
                    onClick={() => navigate("/employer/jobs/create")}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-zinc-200 transition active:scale-95"
                >
                    <Plus className="h-4 w-4" /> Post New Job
                </button>
            </div>

            <div className="grid gap-4 w-full">
                {loading ? (
                    // Skeleton Loader
                    [1, 2].map((i) => <div key={i} className="h-32 bg-[#181818] rounded-xl animate-pulse w-full" />)
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-[#181818] rounded-xl border border-zinc-800 border-dashed text-zinc-500">
                        <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-50" />
                        <p className="text-lg">You haven't posted any jobs yet.</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className="bg-[#181818] border border-white/10 hover:border-white/20 p-5 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all shadow-md w-full max-w-full">

                            {/* Left Side: Job Info */}
                            {/* min-w-0 ensures the flex child shrinks to prevent overflow */}
                            <div className="space-y-3 min-w-0 flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <h3 className="text-xl font-semibold text-white truncate max-w-full">{job.title}</h3>

                                    {/* Status Badge */}
                                    <span className={`self-start sm:self-auto px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide shrink-0 ${job.status === 'OPEN' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {job.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
                                    <span className="flex items-center gap-1.5">
                                        <Briefcase size={14} className="text-zinc-500 shrink-0" />
                                        {job.jobType.replace("_", " ")}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-zinc-500 shrink-0" />
                                        {job.location || "Remote"}
                                    </span>
                                </div>
                            </div>

                            {/* Right Side: Action Buttons */}
                            {/* Mobile: Grid 1x3, Tablet: Grid 3x1, Desktop: Flex Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex gap-3 shrink-0 w-full lg:w-auto">
                                <button
                                    onClick={() => navigate(`/employer/jobs/${job._id}/applicants`)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition font-medium border border-blue-500/20 whitespace-nowrap"
                                >
                                    <Users size={16} />
                                    <span>Applicants</span>
                                </button>

                                <button
                                    onClick={() => navigate(`/employer/jobs/edit/${job._id}`)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition font-medium border border-zinc-700"
                                >
                                    <Pencil size={16} />
                                    <span className="md:hidden lg:inline">Edit</span>
                                </button>

                                <button
                                    onClick={() => remove(job._id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition font-medium border border-red-500/20"
                                >
                                    <Trash2 size={16} />
                                    <span className="md:hidden lg:inline">Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyJobs;