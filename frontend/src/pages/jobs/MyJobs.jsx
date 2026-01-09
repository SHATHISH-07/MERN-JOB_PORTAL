import { useEffect, useState } from "react";
import { getMyJobs, deleteJob } from "../../api/job";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Calendar, Pencil, Trash2 } from "lucide-react";

const MyJobs = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    const loadJobs = () => {
        getMyJobs(token).then((res) => setJobs(res.data));
    };

    useEffect(() => {
        loadJobs();
    });

    const remove = async (id) => {
        if (confirm("Are you sure you want to delete this job?")) {
            await deleteJob(id, token);
            loadJobs();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Job Listings</h1>
                <button
                    onClick={() => navigate("/employer/jobs/create")}
                    className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-zinc-200 transition"
                >
                    Post Job
                </button>
            </div>

            <div className="grid gap-4">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                                <span className="flex items-center gap-1">
                                    <Briefcase size={14} /> {job.jobType.replace("_", " ")}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} /> {job.location || "Remote"}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${job.status === 'OPEN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {job.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(`/employer/jobs/edit/${job._id}`)}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                            >
                                <Pencil size={14} /> Edit
                            </button>
                            <button
                                onClick={() => remove(job._id)}
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </div>
                ))}

                {jobs.length === 0 && (
                    <div className="text-center py-12 text-zinc-500">
                        You haven't posted any jobs yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyJobs;