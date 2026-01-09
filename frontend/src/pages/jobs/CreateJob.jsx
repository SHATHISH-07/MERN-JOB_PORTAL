import { useEffect, useState } from "react";
import { createJob } from "../../api/job";
import { getEmployerProfile } from "../../api/employerProfile";
import { useNavigate } from "react-router-dom";
import {
    Briefcase,
    MapPin,
    FileText,
    ListChecks,
    X,
    Plus,
    Loader2,
    Building2,
    Save,
    Activity // Added Icon
} from "lucide-react";

const CreateJob = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState(null);

    const [responsibilities, setResponsibilities] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [resInput, setResInput] = useState("");
    const [qualInput, setQualInput] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        jobType: "FULL_TIME",
        location: "",
        salaryMin: "",
        salaryMax: "",
        status: "OPEN" // Added status state
    });

    useEffect(() => {
        getEmployerProfile(token)
            .then((res) => {
                setCompany(res.data);
                setForm((prev) => ({
                    ...prev,
                    location: res.data.location || "",
                }));
            })
            .catch(() => { });
    }, [token]);

    const handleAddTag = (e, type) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (type === 'res' && resInput.trim()) {
                setResponsibilities([...responsibilities, resInput.trim()]);
                setResInput("");
            } else if (type === 'qual' && qualInput.trim()) {
                setQualifications([...qualifications, qualInput.trim()]);
                setQualInput("");
            }
        }
    };

    const removeTag = (index, type) => {
        if (type === 'res') {
            setResponsibilities(responsibilities.filter((_, i) => i !== index));
        } else {
            setQualifications(qualifications.filter((_, i) => i !== index));
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createJob(
                {
                    ...form,
                    salaryMin: form.salaryMin || undefined,
                    salaryMax: form.salaryMax || undefined,
                    responsibilities: responsibilities,
                    qualifications: qualifications,
                },
                token
            );
            navigate("/employer/jobs");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 flex justify-center">
            <div className="w-full max-w-4xl space-y-8">

                <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Post a New Position</h1>
                        {company && (
                            <div className="flex items-center gap-2 mt-2 text-zinc-400 text-sm">
                                <Building2 size={14} />
                                <span>Hiring for <span className="text-zinc-200 font-medium">{company.companyName}</span></span>
                            </div>
                        )}
                    </div>
                    <div className="hidden md:block text-xs text-zinc-500 font-mono border border-zinc-800 px-3 py-1 rounded bg-zinc-900">
                        DRAFT_MODE
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">

                    {/* Section 1: Role Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-semibold text-white mb-2">Role Overview</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Define the core details of the position. This is what candidates see first.
                            </p>
                        </div>
                        <div className="md:col-span-2 space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
                            <InputGroup label="Job Title" icon={Briefcase}>
                                <input
                                    required
                                    placeholder="e.g. Senior Frontend Engineer"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </InputGroup>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Employment Type" icon={Briefcase}>
                                    <select
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-600 appearance-none text-zinc-200"
                                        value={form.jobType}
                                        onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                                    >
                                        <option value="FULL_TIME">Full Time</option>
                                        <option value="PART_TIME">Part Time</option>
                                        <option value="REMOTE">Remote</option>
                                        <option value="INTERNSHIP">Internship</option>
                                        <option value="CONTRACT">Contract</option>
                                    </select>
                                </InputGroup>

                                <InputGroup label="Location" icon={MapPin}>
                                    <input
                                        placeholder="e.g. San Francisco, CA"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    />
                                </InputGroup>

                                {/* --- STATUS SELECT ADDED HERE (Full width in mobile, half in grid) --- */}
                                <div className="md:col-span-2">
                                    <InputGroup label="Initial Status" icon={Activity}>
                                        <select
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-600 appearance-none text-zinc-200"
                                            value={form.status}
                                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        >
                                            <option value="OPEN">Open (Active)</option>
                                            <option value="CLOSED">Closed (Hidden)</option>
                                        </select>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Section 2: Compensation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-semibold text-white mb-2">Details & Pay</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Transparent salary ranges increase application rates by up to 40%.
                            </p>
                        </div>
                        <div className="md:col-span-2 space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
                            <div className="grid grid-cols-2 gap-6">
                                <InputGroup label="Min Salary (Annual)">
                                    <input
                                        type="number"
                                        placeholder="80000"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-3 pr-4 text-sm focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-600"
                                        value={form.salaryMin}
                                        onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
                                    />
                                </InputGroup>
                                <InputGroup label="Max Salary (Annual)">
                                    <input
                                        type="number"
                                        placeholder="120000"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-3 pr-4 text-sm focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-600"
                                        value={form.salaryMax}
                                        onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
                                    />
                                </InputGroup>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Job Description</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                    <textarea
                                        required
                                        placeholder="Describe the role, the team, and the mission..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm min-h-37.5 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600 leading-relaxed"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Section 3: Requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Press <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs text-zinc-300 font-sans">Enter</kbd> to add items to the list.
                            </p>
                        </div>
                        <div className="md:col-span-2 space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
                            {/* Responsibilities */}
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Key Responsibilities</label>
                                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {responsibilities.map((item, idx) => (
                                            <div key={idx} className="bg-zinc-800 text-zinc-200 text-xs px-2.5 py-1.5 rounded-md flex items-center gap-2 border border-zinc-700">
                                                <span>{item}</span>
                                                <button type="button" onClick={() => removeTag(idx, 'res')} className="text-zinc-500 hover:text-red-400"><X size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative flex items-center">
                                        <ListChecks className="absolute left-2 w-4 h-4 text-zinc-500" />
                                        <input
                                            value={resInput}
                                            onChange={(e) => setResInput(e.target.value)}
                                            onKeyDown={(e) => handleAddTag(e, 'res')}
                                            placeholder="Type and press Enter..."
                                            className="w-full bg-transparent border-none text-sm py-1.5 pl-9 pr-2 focus:ring-0 placeholder:text-zinc-600"
                                        />
                                        <div className="absolute right-2 cursor-pointer bg-zinc-800 p-1 rounded hover:bg-zinc-700 text-zinc-400" onClick={() => { if (resInput) { setResponsibilities([...responsibilities, resInput]); setResInput(""); } }}>
                                            <Plus size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Qualifications */}
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">Qualifications & Skills</label>
                                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {qualifications.map((item, idx) => (
                                            <div key={idx} className="bg-zinc-800 text-zinc-200 text-xs px-2.5 py-1.5 rounded-md flex items-center gap-2 border border-zinc-700">
                                                <span>{item}</span>
                                                <button type="button" onClick={() => removeTag(idx, 'qual')} className="text-zinc-500 hover:text-red-400"><X size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative flex items-center">
                                        <ListChecks className="absolute left-2 w-4 h-4 text-zinc-500" />
                                        <input
                                            value={qualInput}
                                            onChange={(e) => setQualInput(e.target.value)}
                                            onKeyDown={(e) => handleAddTag(e, 'qual')}
                                            placeholder="Type and press Enter..."
                                            className="w-full bg-transparent border-none text-sm py-1.5 pl-9 pr-2 focus:ring-0 placeholder:text-zinc-600"
                                        />
                                        <div className="absolute right-2 cursor-pointer bg-zinc-800 p-1 rounded hover:bg-zinc-700 text-zinc-400" onClick={() => { if (qualInput) { setQualifications([...qualifications, qualInput]); setQualInput(""); } }}>
                                            <Plus size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end pt-4 pb-12">
                        <button type="button" onClick={() => navigate(-1)} className="mr-4 px-6 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancel</button>
                        <button type="submit" disabled={loading} className="bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50">
                            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                            {loading ? "Publishing..." : "Publish Job Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Reusable Components
const InputGroup = ({ label, icon: Icon, children }) => (
    <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />}
            {children}
        </div>
    </div>
);

const Separator = () => <div className="w-full h-px bg-zinc-800/50 my-2" />;

export default CreateJob;