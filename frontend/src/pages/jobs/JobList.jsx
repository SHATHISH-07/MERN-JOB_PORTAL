import { useEffect, useState } from "react";
import { getJobs } from "../../api/job";
import {
    Search,
    MapPin,
    Briefcase,
    IndianRupee,
    Building2,
    Filter,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");

    const navigate = useNavigate();


    const searchJobs = async (filters) => {
        setLoading(true);
        try {
            const res = await getJobs(filters);
            setJobs(res.data);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobs({})
            .then((res) => setJobs(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        searchJobs({ keyword, location, jobType });
    };

    const handleClearFilters = () => {
        setKeyword("");
        setLocation("");
        setJobType("");
        searchJobs({});
    };

    // Helper: Format Salary
    const formatSalary = (min, max) => {
        if (!min && !max) return "Competitive";
        const k = (num) => num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num;
        return `$${k(min)} - $${k(max)}`;
    };

    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) return "Today";
        if (diffDays === 2) return "Yesterday";
        return `${diffDays} days ago`;
    };

    return (
        <div className="min-h-screen   text-zinc-100 pb-20">

            <div className="bg-[#09090b] border-b border-zinc-800 pt-12 pb-10 px-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                            Find your next mission
                        </h1>
                        <p className="text-zinc-400">
                            Explore thousands of remote and on-site opportunities at top tech companies.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="bg-[#18181b] p-2 rounded-xl border border-zinc-800 flex flex-col md:flex-row gap-2 shadow-xl shadow-black/50">

                        <div className="flex-1 flex items-center px-4 h-12 bg-zinc-900/50 rounded-lg border border-transparent focus-within:border-zinc-700 focus-within:bg-zinc-900 transition-all">
                            <Search className="text-zinc-500 w-5 h-5 mr-3" />
                            <input
                                type="text"
                                placeholder="Job title or keyword..."
                                className="bg-transparent w-full outline-none text-sm placeholder:text-zinc-600"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>


                        <div className="flex-1 flex items-center px-4 h-12 bg-zinc-900/50 rounded-lg border border-transparent focus-within:border-zinc-700 focus-within:bg-zinc-900 transition-all">
                            <MapPin className="text-zinc-500 w-5 h-5 mr-3" />
                            <input
                                type="text"
                                placeholder="Location (e.g. Remote, NY)"
                                className="bg-transparent w-full outline-none text-sm placeholder:text-zinc-600"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>


                        <div className="relative w-full md:w-48 h-12 bg-zinc-900/50 rounded-lg border border-transparent focus-within:border-zinc-700 focus-within:bg-zinc-900 transition-all">
                            <Filter className="absolute left-4 top-3.5 text-zinc-500 w-5 h-5 pointer-events-none" />
                            <select
                                className="w-full h-full bg-transparent pl-12 pr-4 outline-none text-sm appearance-none text-zinc-300 cursor-pointer"
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                            >
                                <option value="">Any Type</option>
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="REMOTE">Remote</option>
                                <option value="INTERNSHIP">Internship</option>
                                <option value="CONTRACT">Contract</option>
                            </select>
                        </div>


                        <button type="submit" className="bg-white hover:bg-zinc-200 text-black font-semibold h-12 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
                            Search
                        </button>
                    </form>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-zinc-500">Curating opportunities...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="group bg-[#09090b] border border-zinc-800 hover:border-zinc-600 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/50 flex flex-col justify-between"
                            >

                                <div>
                                    <div className="flex justify-between items-start mb-6">

                                        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700 overflow-hidden">
                                            {job.company?.logoUrl ? (
                                                <img src={job.company.logoUrl} alt="logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <Building2 className="text-zinc-500 w-6 h-6" />
                                            )}
                                        </div>
                                        <span className="text-xs font-medium bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-zinc-700">
                                            {getRelativeTime(job.createdAt)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 mb-6 line-clamp-1">
                                        {job.company?.companyName || "Confidential Company"}
                                    </p>


                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-xs text-zinc-400 gap-2">
                                            <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                                            {job.jobType.replace("_", " ")}
                                        </div>
                                        <div className="flex items-center text-xs text-zinc-400 gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                                            {job.location || "Remote"}
                                        </div>
                                        <div className="flex items-center text-xs text-zinc-300 font-medium gap-2">
                                            <IndianRupee className="w-3.5 h-3.5 text-emerald-500" />
                                            {formatSalary(job.salaryMin, job.salaryMax)}
                                        </div>
                                    </div>
                                </div>


                                <div className="border-t border-zinc-800 pt-4 mt-2">
                                    <button
                                        onClick={() => navigate(`/jobs/${job._id}`)}
                                        className="w-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-transparent">
                                        View Details
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && jobs.length === 0 && (
                    <div className="text-center py-20 bg-[#09090b] border border-zinc-800 rounded-xl">
                        <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
                        <p className="text-zinc-500">Try adjusting your filters or search keywords.</p>
                        <button
                            onClick={handleClearFilters}
                            className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobList;