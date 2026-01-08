import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJobSeekerProfile } from "../api/jobSeekerProfile";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    const [profileCompletion, setProfileCompletion] = useState(0);


    // Job Seeker
    const appliedJobs = [
        { id: 1, title: "Frontend Developer", company: "TechVision", status: "Under Review" },
        { id: 2, title: "React Engineer", company: "StartupX", status: "Shortlisted" },
    ];

    const recommendedJobs = [
        { id: 1, title: "UI Engineer", company: "DesignHub", location: "Remote" },
        { id: 2, title: "Frontend Developer", company: "CloudNine", location: "Bangalore" },
    ];

    // Employer
    const employerStats = {
        totalJobs: 4,
        activeJobs: 3,
        totalApplications: 27,
    };

    const postedJobs = [
        { id: 1, title: "Frontend Developer", status: "Open", applicants: 12 },
        { id: 2, title: "Backend Engineer", status: "Open", applicants: 8 },
        { id: 3, title: "UI Designer", status: "Closed", applicants: 7 },
    ];

    const recentApplications = [
        { id: 1, candidate: "John Doe", job: "Frontend Developer", status: "New" },
        { id: 2, candidate: "Jane Smith", job: "Backend Engineer", status: "Reviewed" },
    ];


    useEffect(() => {
        if (user?.role === "JOB_SEEKER") {
            getJobSeekerProfile(token)
                .then((res) => calculateProfileCompletion(res.data))
                .catch(() => { });
        }
    }, []);


    const calculateProfileCompletion = (profileData) => {
        const fields = [
            "fullName",
            "phone",
            "location",
            "currentRole",
            "skills",
            "experience",
            "resumeUrl",
            "linkedinUrl",
        ];

        const filled = fields.filter((field) => {
            const value = profileData[field];
            if (Array.isArray(value)) return value.length > 0;
            return value && value.toString().trim() !== "";
        });

        setProfileCompletion(Math.round((filled.length / fields.length) * 100));
    };

    if (!user) return null;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    {user.role === "EMPLOYER" ? "Employer Dashboard" : "Candidate Dashboard"}
                </h1>
                <button
                    onClick={logout}
                    className="bg-white text-black px-4 py-2 rounded-lg font-medium"
                >
                    Logout
                </button>
            </div>

            {/* ---------------- JOB SEEKER DASHBOARD ---------------- */}
            {user.role === "JOB_SEEKER" && (
                <>
                    {/* Profile Completion */}
                    <div className="bg-[#181818] border border-white/10 rounded-xl p-6">
                        <h2 className="font-semibold mb-3">Profile Completion</h2>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-green-500 h-full"
                                style={{ width: `${profileCompletion}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            {profileCompletion}% completed – complete your profile to get better job matches
                        </p>
                    </div>

                    {/* Applied Jobs */}
                    <div className="bg-[#181818] border border-white/10 rounded-xl p-6">
                        <h2 className="font-semibold mb-4">Applied Jobs</h2>
                        {appliedJobs.map((job) => (
                            <div key={job.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                                <div>
                                    <p className="font-medium">{job.title}</p>
                                    <p className="text-gray-400">{job.company}</p>
                                </div>
                                <span className="text-blue-400">{job.status}</span>
                            </div>
                        ))}
                    </div>

                    {/* Recommended Jobs */}
                    <div className="bg-[#181818] border border-white/10 rounded-xl p-6">
                        <h2 className="font-semibold mb-4">Recommended Jobs</h2>
                        {recommendedJobs.map((job) => (
                            <div key={job.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                                <div>
                                    <p className="font-medium">{job.title}</p>
                                    <p className="text-gray-400">{job.company}</p>
                                </div>
                                <span className="text-gray-400">{job.location}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ---------------- EMPLOYER DASHBOARD ---------------- */}
            {user.role === "EMPLOYER" && (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard label="Total Jobs" value={employerStats.totalJobs} />
                        <StatCard label="Active Jobs" value={employerStats.activeJobs} />
                        <StatCard label="Applications" value={employerStats.totalApplications} />
                    </div>

                    {/* Posted Jobs */}
                    <div className="bg-[#181818] border border-white/10 rounded-xl p-6">
                        <h2 className="font-semibold mb-4">Posted Jobs</h2>
                        {postedJobs.map((job) => (
                            <div key={job.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                                <div>
                                    <p className="font-medium">{job.title}</p>
                                    <p className="text-gray-400">Applicants: {job.applicants}</p>
                                </div>
                                <span className={job.status === "Open" ? "text-green-400" : "text-red-400"}>
                                    {job.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-[#181818] border border-white/10 rounded-xl p-6">
                        <h2 className="font-semibold mb-4">Recent Applications</h2>
                        {recentApplications.map((app) => (
                            <div key={app.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                                <div>
                                    <p className="font-medium">{app.candidate}</p>
                                    <p className="text-gray-400">{app.job}</p>
                                </div>
                                <span className="text-blue-400">{app.status}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const StatCard = ({ label, value }) => (
    <div className="bg-[#181818] border border-white/10 rounded-xl p-6 text-center">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
);

export default Dashboard;
