import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicJobById } from "../../api/job";
import {
    MapPin,
    Briefcase,
    Building2,
    ArrowLeft,
    Clock,
    CheckCircle2,
    Globe,
    Share2,
    IndianRupee // Using Rupee icon for the sidebar visual
} from "lucide-react";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublicJobById(id)
            .then((res) => setJob(res.data))
            .finally(() => setLoading(false));
    }, [id]);

    // Helper: Format Salary (Removed Dollar Sign)
    const formatSalary = (min, max) => {
        if (!min && !max) return "Competitive Salary";
        // Formats 80000 -> 80k
        const k = (num) => num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num;
        return `${k(min)} - ${k(max)} / year`;
    };

    // Helper: Relative Time
    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const diffDays = Math.ceil(Math.abs(new Date() - date) / (1000 * 60 * 60 * 24));
        return diffDays === 1 ? "Today" : `${diffDays} days ago`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-zinc-500">
                    <div className="animate-spin w-8 h-8 border-2 border-zinc-600 border-t-transparent rounded-full"></div>
                    <p className="text-sm font-medium">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-white">Job Not Found</h2>
                    <p className="text-zinc-400">This listing may have expired or been removed.</p>
                    <button onClick={() => navigate('/jobs')} className="text-blue-400 hover:underline">Browse all jobs</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  text-zinc-100">
            {/* Header Banner */}
            <div className="bg-[#09090b] border-b border-zinc-800">
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Jobs
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                        <div className="flex items-start gap-5">
                            <div className="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 overflow-hidden shrink-0 shadow-lg">
                                {job.company?.logoUrl ? (
                                    <img src={job.company.logoUrl} alt="logo" className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="text-zinc-500 w-8 h-8" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">{job.title}</h1>
                                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-zinc-400">
                                    <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                                        {job.company?.companyName}
                                    </span>
                                    <span className="hidden md:inline w-1 h-1 bg-zinc-700 rounded-full"></span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={14} /> {job.location || "Remote"}
                                    </span>
                                    <span className="hidden md:inline w-1 h-1 bg-zinc-700 rounded-full"></span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={14} /> Posted {getRelativeTime(job.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 md:self-center shrink-0">
                            <button className="p-3 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all">
                                <Share2 size={20} />
                            </button>
                            <button className="bg-white hover:bg-zinc-200 text-black font-bold px-8 py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Left Column: Description (2/3 width) */}
                <div className="md:col-span-2 space-y-10">
                    <section>
                        <h3 className="text-lg font-bold text-white mb-4">About the Job</h3>
                        <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-base">
                            {job.description}
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-white mb-4">Key Responsibilities</h3>
                        <ul className="space-y-3">
                            {job.responsibilities.map((res, i) => (
                                <li key={i} className="flex items-start gap-3 text-zinc-300 leading-relaxed">
                                    <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                                    <span>{res}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-white mb-4">Qualifications</h3>
                        <ul className="space-y-3">
                            {job.qualifications.map((qual, i) => (
                                <li key={i} className="flex items-start gap-3 text-zinc-300 leading-relaxed">
                                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full mt-2.5 shrink-0" />
                                    <span>{qual}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Right Column: Sidebar (1/3 width) */}
                <div className="md:col-span-1 space-y-6">
                    {/* Job Overview Card */}
                    <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-6 sticky top-24">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Job Overview</h3>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400">
                                    <IndianRupee size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase mb-0.5">Salary</p>
                                    <p className="text-zinc-200 font-medium">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase mb-0.5">Job Type</p>
                                    <p className="text-zinc-200 font-medium capitalize">{job.jobType.replace(/_/g, ' ').toLowerCase()}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 font-medium uppercase mb-0.5">Location</p>
                                    <p className="text-zinc-200 font-medium">{job.location || "Remote"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-zinc-800 my-6" />

                        {job.company?.companyWebsite && (
                            <a
                                href={job.company.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium py-2.5 rounded-lg transition-colors border border-zinc-800"
                            >
                                <Globe size={16} /> Visit Website
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobDetails;