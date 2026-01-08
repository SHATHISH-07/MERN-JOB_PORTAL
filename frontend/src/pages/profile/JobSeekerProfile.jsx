import { useEffect, useState } from "react";
import { getJobSeekerProfile, saveJobSeekerProfile } from "../../api/jobSeekerProfile";
import { Loader2 } from "lucide-react"; // Only keeping the loader icon

const JobSeekerProfile = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        location: "",
        currentRole: "",
        skills: [],
        experience: "",
        experienceLevel: "",
        preferredJobType: "",
        expectedSalary: "",
        noticePeriod: "",
        resumeUrl: "",
        linkedinUrl: "",
        portfolioUrl: "",
        education: "",
        certifications: [],
        bio: "",
    });

    useEffect(() => {
        setLoading(true);
        getJobSeekerProfile(token)
            .then((res) => setForm(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveJobSeekerProfile(form, token);
            // Optional: Add a toast notification here
            alert("Profile saved successfully");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111111] text-zinc-200 selection:bg-zinc-800 selection:text-zinc-100 font-sans">
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 lg:py-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                            Profile Settings
                        </h1>
                        <p className="text-zinc-400">
                            Manage your professional identity and preferences.
                        </p>
                    </div>
                    <button
                        onClick={submit}
                        disabled={saving}
                        className="h-11 px-8 rounded-full bg-white text-black font-medium hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center min-w-35"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Sidebar / Navigation or Summary (Optional, keeping it clean for now) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                                Quick Tips
                            </h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Keep your profile concise. Recruiters spend an average of 7 seconds reviewing a resume. Ensure your skills and current role are up to date.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-9 space-y-12">

                        {/* Section: Identity */}
                        <section className="space-y-6">
                            <SectionHeader title="Identity" subtitle="Your basic contact and personal information." />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <Field label="Full Name" value={form.fullName} onChange={v => setForm({ ...form, fullName: v })} placeholder="e.g. Jane Doe" />
                                <Field label="Current Role" value={form.currentRole} onChange={v => setForm({ ...form, currentRole: v })} placeholder="e.g. Senior Frontend Engineer" />
                                <Field label="Phone Number" value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="+1 (555) 000-0000" />
                                <Field label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} placeholder="City, Country" />
                                <div className="md:col-span-2">
                                    <TextArea label="Professional Bio" value={form.bio} onChange={v => setForm({ ...form, bio: v })} placeholder="Briefly describe your experience and career goals..." />
                                </div>
                            </div>
                        </section>

                        {/* Section: Career & Preferences */}
                        <section className="space-y-6">
                            <SectionHeader title="Career & Preferences" subtitle="What are you looking for in your next role?" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <Select
                                    label="Experience Level"
                                    value={form.experienceLevel}
                                    options={["Fresher", "Junior", "Mid-Level", "Senior", "Lead", "Executive"]}
                                    onChange={v => setForm({ ...form, experienceLevel: v })}
                                />
                                <Field label="Years of Experience" value={form.experience} onChange={v => setForm({ ...form, experience: v })} placeholder="e.g. 5 years" />
                                <Select
                                    label="Preferred Job Type"
                                    value={form.preferredJobType}
                                    options={["Full Time", "Part Time", "Remote", "Internship", "Contract"]}
                                    onChange={v => setForm({ ...form, preferredJobType: v })}
                                />
                                <Field label="Expected Salary" value={form.expectedSalary} onChange={v => setForm({ ...form, expectedSalary: v })} placeholder="e.g. $120,000 / year" />
                                <Field label="Notice Period" value={form.noticePeriod} onChange={v => setForm({ ...form, noticePeriod: v })} placeholder="e.g. Immediate, 30 days" />
                            </div>
                        </section>

                        {/* Section: Skills & Education */}
                        <section className="space-y-6">
                            <SectionHeader title="Competency" subtitle="Showcase your skills and educational background." />
                            <div className="space-y-6">
                                <Field label="Skills" value={form.skills.join(", ")} onChange={v => setForm({ ...form, skills: v.split(",") })} placeholder="React, Node.js, TypeScript (Comma separated)" />
                                <Field label="Certifications" value={form.certifications.join(", ")} onChange={v => setForm({ ...form, certifications: v.split(",") })} placeholder="AWS Solutions Architect, PMP (Comma separated)" />
                                <Field label="Education" value={form.education} onChange={v => setForm({ ...form, education: v })} placeholder="Degree, University, Graduation Year" />
                            </div>
                        </section>

                        {/* Section: Digital Presence */}
                        <section className="space-y-6 pb-12">
                            <SectionHeader title="Digital Presence" subtitle="Where can recruiters find your work?" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Field label="LinkedIn URL" value={form.linkedinUrl} onChange={v => setForm({ ...form, linkedinUrl: v })} placeholder="linkedin.com/in/..." />
                                <Field label="Portfolio URL" value={form.portfolioUrl} onChange={v => setForm({ ...form, portfolioUrl: v })} placeholder="yourwebsite.com" />
                                <Field label="Resume URL" value={form.resumeUrl} onChange={v => setForm({ ...form, resumeUrl: v })} placeholder="Google Drive / Dropbox Link" />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- Modern UI Components --- */

const SectionHeader = ({ title, subtitle }) => (
    <div className="border-b border-zinc-800/50 pb-4 mb-2">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {subtitle && <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>}
    </div>
);

const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="group">
        <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wide group-focus-within:text-white transition-colors">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 
            focus:outline-none focus:bg-zinc-900 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all duration-200"
        />
    </div>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
    <div className="group">
        <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wide group-focus-within:text-white transition-colors">
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 
            focus:outline-none focus:bg-zinc-900 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all duration-200 resize-none"
        />
    </div>
);

const Select = ({ label, value, options, onChange }) => (
    <div className="group">
        <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wide group-focus-within:text-white transition-colors">
            {label}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 appearance-none 
                focus:outline-none focus:bg-zinc-900 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all duration-200 cursor-pointer"
            >
                <option value="" disabled>Select an option</option>
                {options.map((o) => (
                    <option key={o} value={o.toUpperCase().replace(" ", "_")}>
                        {o}
                    </option>
                ))}
            </select>
            {/* Custom Arrow for select */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    </div>
);

export default JobSeekerProfile;