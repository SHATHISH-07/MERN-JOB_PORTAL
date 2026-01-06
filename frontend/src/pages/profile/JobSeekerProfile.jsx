import { useEffect, useState } from "react";
import { getJobSeekerProfile, saveJobSeekerProfile } from "../../api/jobSeekerProfile";
import { User, Phone, MapPin, Briefcase, DollarSign, Clock, FileText, Globe, Linkedin, Award, GraduationCap, Save, CheckCircle } from "lucide-react";

const JobSeekerProfile = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: "", phone: "", location: "", currentRole: "", skills: [],
        experience: "", experienceLevel: "", preferredJobType: "", expectedSalary: "",
        noticePeriod: "", resumeUrl: "", linkedinUrl: "", portfolioUrl: "",
        education: "", certifications: [], bio: "",
    });

    useEffect(() => {
        getJobSeekerProfile(token)
            .then((res) => setForm(res.data))
            .catch(() => { });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveJobSeekerProfile(form, token);
            alert("Profile updated successfully");
        } finally {
            setLoading(false);
        }
    };

    // Professional Styles
    const labelClass = "block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5";
    const inputWrapperClass = "relative flex items-center";
    const iconClass = "absolute left-3 w-4 h-4 text-zinc-500 pointer-events-none";
    const inputClass = "w-full bg-zinc-950 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors";
    const selectClass = "w-full bg-zinc-950 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors appearance-none";

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* --- LEFT SIDEBAR: PROFESSIONAL SUMMARY --- */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-8">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-sm">
                            <div className="flex flex-col items-center text-center pb-6 border-b border-zinc-800">
                                <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-2xl font-semibold text-zinc-400 border-2 border-zinc-700">
                                    {form.fullName ? form.fullName.charAt(0).toUpperCase() : "U"}
                                </div>
                                <h2 className="text-xl font-bold text-white">{form.fullName || "Candidate Name"}</h2>
                                <p className="text-blue-500 font-medium text-sm mt-1">{form.currentRole || "Current Role"}</p>
                                <div className="flex items-center gap-2 mt-3 text-zinc-500 text-xs bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                                    <MapPin size={12} /> {form.location || "Location not set"}
                                </div>
                            </div>

                            <div className="py-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Experience</span>
                                    <span className="font-medium">{form.experience || "N/A"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Expected Salary</span>
                                    <span className="font-medium">{form.expectedSalary ? `$${form.expectedSalary}` : "N/A"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Notice Period</span>
                                    <span className="font-medium">{form.noticePeriod || "N/A"}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-800">
                                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {form.skills.length > 0 && form.skills[0] !== "" ? (
                                        form.skills.map((skill, index) => (
                                            <span key={index} className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-md">
                                                {skill.trim()}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-zinc-600 text-xs italic">No skills listed</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={submit}
                            disabled={loading}
                            className="mt-4 w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? "Saving..." : <><Save size={18} /> Save Profile</>}
                        </button>
                    </div>
                </div>

                {/* --- RIGHT CONTENT: EDIT FORM --- */}
                <div className="lg:col-span-8 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
                        <p className="text-zinc-400 mt-1">Manage your professional information and preferences.</p>
                    </div>

                    {/* Personal Info */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
                            <User size={18} className="text-zinc-400" /> Personal Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Full Name</label>
                                <div className={inputWrapperClass}>
                                    <User className={iconClass} />
                                    <input className={inputClass} placeholder="John Doe" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Phone Number</label>
                                <div className={inputWrapperClass}>
                                    <Phone className={iconClass} />
                                    <input className={inputClass} placeholder="+1 234 567 890" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Location</label>
                                <div className={inputWrapperClass}>
                                    <MapPin className={iconClass} />
                                    <input className={inputClass} placeholder="New York, USA" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Professional Summary</label>
                                <textarea
                                    className={`${inputClass} min-h-[100px] pl-4`}
                                    placeholder="Write a brief summary about your career..."
                                    value={form.bio}
                                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Professional Info */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
                            <Briefcase size={18} className="text-zinc-400" /> Professional Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Current Role</label>
                                <div className={inputWrapperClass}>
                                    <Briefcase className={iconClass} />
                                    <input className={inputClass} placeholder="Software Engineer" value={form.currentRole} onChange={(e) => setForm({ ...form, currentRole: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Total Experience</label>
                                <div className={inputWrapperClass}>
                                    <Clock className={iconClass} />
                                    <input className={inputClass} placeholder="e.g. 5 years" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Experience Level</label>
                                <div className={inputWrapperClass}>
                                    <Award className={iconClass} />
                                    <select className={selectClass} value={form.experienceLevel} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })}>
                                        <option value="">Select Level</option>
                                        <option value="FRESHER">Fresher</option>
                                        <option value="JUNIOR">Junior</option>
                                        <option value="MID">Mid-Level</option>
                                        <option value="SENIOR">Senior</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Expected Salary ($)</label>
                                <div className={inputWrapperClass}>
                                    <DollarSign className={iconClass} />
                                    <input className={inputClass} type="number" placeholder="80000" value={form.expectedSalary} onChange={(e) => setForm({ ...form, expectedSalary: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Skills & Links */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
                            <CheckCircle size={18} className="text-zinc-400" /> Skills & Links
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className={labelClass}>Skills (Comma separated)</label>
                                <div className={inputWrapperClass}>
                                    <Award className={iconClass} />
                                    <input className={inputClass} placeholder="React, Node.js, TypeScript" value={form.skills.join(",")} onChange={(e) => setForm({ ...form, skills: e.target.value.split(",") })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Education</label>
                                    <div className={inputWrapperClass}>
                                        <GraduationCap className={iconClass} />
                                        <input className={inputClass} placeholder="University / Degree" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Resume URL</label>
                                    <div className={inputWrapperClass}>
                                        <FileText className={iconClass} />
                                        <input className={inputClass} placeholder="https://..." value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>LinkedIn URL</label>
                                    <div className={inputWrapperClass}>
                                        <Linkedin className={iconClass} />
                                        <input className={inputClass} placeholder="https://linkedin.com/in/..." value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Portfolio URL</label>
                                    <div className={inputWrapperClass}>
                                        <Globe className={iconClass} />
                                        <input className={inputClass} placeholder="https://..." value={form.portfolioUrl} onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerProfile;