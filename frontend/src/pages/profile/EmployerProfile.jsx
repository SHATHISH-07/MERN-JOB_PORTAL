import { useEffect, useState } from "react";
import { getEmployerProfile, saveEmployerProfile } from "../../api/employerProfile";
import { Loader2, Building2, Globe, MapPin } from "lucide-react";

const EmployerProfile = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        companyName: "",
        industry: "",
        companyDescription: "",
        companyWebsite: "",
        companySize: "",
        companyType: "",
        foundedYear: "",
        location: "",
        contactEmail: "",
        contactPhone: "",
        logoUrl: "",
    });

    useEffect(() => {
        setLoading(true);
        getEmployerProfile(token)
            .then((res) => setForm(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveEmployerProfile(form, token);
            alert("Company profile saved successfully");
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
        <div className="min-h-screen bg-[#09090b] text-zinc-200 selection:bg-zinc-800 selection:text-zinc-100 font-sans">
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                            Company Profile
                        </h1>
                        <p className="text-zinc-400">
                            Manage your organization's brand and public details.
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
                            "Save Profile"
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Live Card Preview */}
                    <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                        <div className="sticky top-12">
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                Card Preview
                            </h3>
                            {/* Preview Card */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-16 h-16 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                                        {form.logoUrl ? (
                                            <img src={form.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <Building2 className="w-8 h-8 text-zinc-600" />
                                        )}
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-xs text-zinc-400">
                                        {form.companyType || "Type"}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">
                                        {form.companyName || "Company Name"}
                                    </h4>
                                    <p className="text-sm text-zinc-500 mb-4">
                                        {form.industry || "Industry"}
                                    </p>
                                    <div className="space-y-2 text-sm text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-zinc-600" />
                                            <span>{form.location || "Location"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-zinc-600" />
                                            <span className="truncate max-w-50">{form.companyWebsite || "Website"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-600 mt-4 px-2">
                                This is how your company card will appear to job seekers in search results.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-8 space-y-12 order-1 lg:order-2">

                        {/* Section: Essentials */}
                        <section className="space-y-6">
                            <SectionHeader title="Essentials" subtitle="Core information about your organization." />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <Field label="Company Name" value={form.companyName} onChange={v => setForm({ ...form, companyName: v })} placeholder="e.g. Acme Corp" />
                                <Field label="Industry" value={form.industry} onChange={v => setForm({ ...form, industry: v })} placeholder="e.g. Fintech, Healthcare" />
                                <Field label="Website URL" value={form.companyWebsite} onChange={v => setForm({ ...form, companyWebsite: v })} placeholder="https://..." />
                                <Field label="Headquarters" value={form.location} onChange={v => setForm({ ...form, location: v })} placeholder="City, Country" />
                                <div className="md:col-span-2">
                                    <Field label="Logo URL" value={form.logoUrl} onChange={v => setForm({ ...form, logoUrl: v })} placeholder="https://..." />
                                    <p className="text-[10px] text-zinc-500 mt-1.5">Provide a direct link to a transparent PNG or SVG for best results.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section: About */}
                        <section className="space-y-6">
                            <SectionHeader title="About" subtitle="Tell candidates what makes your company unique." />
                            <div className="space-y-6">
                                <TextArea
                                    label="Company Description"
                                    value={form.companyDescription}
                                    onChange={v => setForm({ ...form, companyDescription: v })}
                                    placeholder="Share your mission, vision, and culture..."
                                />
                            </div>
                        </section>

                        {/* Section: Details */}
                        <section className="space-y-6">
                            <SectionHeader title="Organization Details" subtitle="Help candidates understand your scale and structure." />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Select
                                    label="Company Size"
                                    value={form.companySize}
                                    options={["1-10", "11-50", "51-200", "201-500", "500-1000", "1000+"]}
                                    onChange={v => setForm({ ...form, companySize: v })}
                                />
                                <Select
                                    label="Company Type"
                                    value={form.companyType}
                                    options={["Startup", "MNC", "Agency", "Product Based", "Non-Profit"]}
                                    onChange={v => setForm({ ...form, companyType: v })}
                                />
                                <Field label="Founded Year" value={form.foundedYear} onChange={v => setForm({ ...form, foundedYear: v })} placeholder="e.g. 2015" />
                            </div>
                        </section>

                        {/* Section: Contact */}
                        <section className="space-y-6 pb-12">
                            <SectionHeader title="Contact Information" subtitle="Private details for administrative purposes." />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field label="Contact Email" value={form.contactEmail} onChange={v => setForm({ ...form, contactEmail: v })} placeholder="hr@company.com" />
                                <Field label="Contact Phone" value={form.contactPhone} onChange={v => setForm({ ...form, contactPhone: v })} placeholder="+1 (555) ..." />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- Shared UI Components --- */

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
            rows={5}
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
                <option value="" disabled>Select</option>
                {options.map((o) => (
                    <option key={o} value={o.toUpperCase().replace(" ", "_")}>
                        {o}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    </div>
);

export default EmployerProfile;