import { useEffect, useState } from "react";
import { getEmployerProfile, saveEmployerProfile } from "../../api/employerProfile";
import { Building2, Globe, Users, Briefcase, Calendar, MapPin, Mail, Phone, Image, Save } from "lucide-react";

const EmployerProfile = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        companyName: "", industry: "", companyDescription: "", companyWebsite: "",
        companySize: "", companyType: "", foundedYear: "", location: "",
        contactEmail: "", contactPhone: "", logoUrl: "",
    });

    useEffect(() => {
        getEmployerProfile(token)
            .then((res) => setForm(res.data))
            .catch(() => { });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveEmployerProfile(form, token);
            alert("Profile saved");
        } finally {
            setLoading(false);
        }
    };

    // Professional Styles
    const labelClass = "block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5";
    const inputWrapperClass = "relative flex items-center";
    const iconClass = "absolute left-3 w-4 h-4 text-zinc-500 pointer-events-none";
    const inputClass = "w-full bg-zinc-950 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
    const selectClass = "w-full bg-zinc-950 border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors appearance-none";

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* --- LEFT SIDEBAR: COMPANY PREVIEW --- */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-8">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-sm">
                            <div className="flex flex-col items-start pb-6 border-b border-zinc-800">
                                <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 border border-zinc-700 overflow-hidden">
                                    {form.logoUrl ? <img src={form.logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <Building2 size={28} className="text-zinc-500" />}
                                </div>
                                <h2 className="text-xl font-bold text-white leading-tight">{form.companyName || "Company Name"}</h2>
                                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                                    {form.industry || "Industry"}
                                </span>
                            </div>

                            <div className="py-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <Users size={16} />
                                    <span>{form.companySize || "Size not set"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <Briefcase size={16} />
                                    <span>{form.companyType || "Type not set"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <MapPin size={16} />
                                    <span className="truncate">{form.location || "Location not set"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <Globe size={16} />
                                    <span className="truncate text-blue-400 hover:underline cursor-pointer">{form.companyWebsite || "Website"}</span>
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
                        <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
                        <p className="text-zinc-400 mt-1">Establish your brand presence to attract top talent.</p>
                    </div>

                    {/* Overview */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
                            <Building2 size={18} className="text-zinc-400" /> Essentials
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Company Name</label>
                                <div className={inputWrapperClass}>
                                    <Building2 className={iconClass} />
                                    <input className={inputClass} placeholder="Acme Corp" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Industry</label>
                                <div className={inputWrapperClass}>
                                    <Briefcase className={iconClass} />
                                    <input className={inputClass} placeholder="e.g. Fintech" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Description</label>
                                <textarea
                                    className={`${inputClass} min-h-[120px] pl-4`}
                                    placeholder="Tell us about your mission..."
                                    value={form.companyDescription}
                                    onChange={(e) => setForm({ ...form, companyDescription: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Website URL</label>
                                <div className={inputWrapperClass}>
                                    <Globe className={iconClass} />
                                    <input className={inputClass} placeholder="https://..." value={form.companyWebsite} onChange={(e) => setForm({ ...form, companyWebsite: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Logo URL</label>
                                <div className={inputWrapperClass}>
                                    <Image className={iconClass} />
                                    <input className={inputClass} placeholder="https://..." value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Details */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
                            <Users size={18} className="text-zinc-400" /> Structure
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClass}>Size</label>
                                <div className={inputWrapperClass}>
                                    <Users className={iconClass} />
                                    <select className={selectClass} value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })}>
                                        <option value="">Select</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="500+">500+</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Type</label>
                                <div className={inputWrapperClass}>
                                    <Briefcase className={iconClass} />
                                    <select className={selectClass} value={form.companyType} onChange={(e) => setForm({ ...form, companyType: e.target.value })}>
                                        <option value="">Select</option>
                                        <option value="STARTUP">Startup</option>
                                        <option value="MNC">MNC</option>
                                        <option value="AGENCY">Agency</option>
                                        <option value="PRODUCT">Product</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Founded</label>
                                <div className={inputWrapperClass}>
                                    <Calendar className={iconClass} />
                                    <input className={inputClass} placeholder="Year" value={form.foundedYear} onChange={(e) => setForm({ ...form, foundedYear: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
                            <Phone size={18} className="text-zinc-400" /> Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClass}>HQ Location</label>
                                <div className={inputWrapperClass}>
                                    <MapPin className={iconClass} />
                                    <input className={inputClass} placeholder="Headquarters Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Contact Email</label>
                                <div className={inputWrapperClass}>
                                    <Mail className={iconClass} />
                                    <input className={inputClass} placeholder="hr@company.com" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Contact Phone</label>
                                <div className={inputWrapperClass}>
                                    <Phone className={iconClass} />
                                    <input className={inputClass} placeholder="+1 ..." value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EmployerProfile;