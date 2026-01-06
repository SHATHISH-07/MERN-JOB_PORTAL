import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Briefcase, ChevronDown, MapPin, DollarSign, Building2 } from "lucide-react";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "JOB_SEEKER",
    });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert("Registered successfully");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };


    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-[#212121]">
            {/* LEFT SIDE - JOB PORTAL UI DESIGN */}
            <div className="hidden md:flex flex-col relative overflow-hidden bg-[#181818] border-r border-white/5 h-full">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(#4a4a4a 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                {/* Text Content */}
                <div className="z-20 relative p-12 pb-0 space-y-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            JobPortal
                        </h1>
                        <div className="w-12 h-px bg-white/20" />
                    </div>
                    <div className="space-y-4 max-w-lg">
                        <h2 className="text-2xl text-white font-medium leading-snug">
                            Join the network of future leaders.
                        </h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            Create your account today to access thousands of premium job listings
                            and connect with top-tier employers. From startups to Fortune 500s,
                            your next big opportunity is just a click away.
                        </p>
                    </div>
                </div>

                {/* Job Portal UI Mock - Job Posting Card */}
                <div className="absolute top-[40%] left-16 right-0 bottom-[-10%] z-10 perspective-[1000px] pointer-events-none select-none">
                    <div className="relative w-full max-w-md bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl transform rotate-x-6 rotate-y-6 -rotate-z-2 scale-100 origin-top-right overflow-hidden p-6">

                        {/* Company Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-base">TechVision Inc.</h3>
                                    <p className="text-gray-500 text-xs">Posted 2h ago</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
                                URGENT HIRING
                            </span>
                        </div>

                        {/* Job Title & Info */}
                        <h2 className="text-2xl text-white font-bold mb-4">Software Engineer</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>Chennai, Tamil Nadu, India</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 text-sm">
                                <Briefcase className="w-4 h-4 text-gray-500" />
                                <span>Full-time · Mid-Senior Level</span>
                            </div>
                            <div className="flex items-center gap-3 text-white font-medium text-sm">
                                <DollarSign className="w-4 h-4 text-green-500" />
                                <span>6 - 10 LPA / year</span>
                            </div>
                        </div>

                        {/* Applicants Section */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-[#1e1e1e]" />
                                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-[#1e1e1e]" />
                                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-[#1e1e1e]" />
                                <div className="w-8 h-8 rounded-full bg-[#333] border-2 border-[#1e1e1e] flex items-center justify-center text-[10px] text-white font-bold">
                                    +42
                                </div>
                            </div>
                            <div className="text-gray-500 text-xs font-medium">
                                45 Applicants
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 mt-6">
                            <span>Apply Now</span>
                        </div>

                        {/* Fade Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-transparent to-transparent opacity-40" />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="flex items-center justify-center px-6 py-12 bg-[#212121] md:bg-[#121212] relative z-30">
                <div className="w-full max-w-md bg-[#181818] border border-white/5 shadow-2xl rounded-xl p-8">
                    <div className="space-y-1 mb-6 text-center">
                        <h2 className="text-2xl text-white font-bold tracking-tight">
                            Create an Account
                        </h2>
                        <p className="text-sm text-gray-400">
                            Join as a {form.role === "JOB_SEEKER" ? "Candidate" : "Employer"}
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-4">

                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="text"
                                    placeholder={form.role === "JOB_SEEKER" ? "Full Name" : "Company Name"}
                                    className="w-full h-12 bg-[#252525] border border-white/10 rounded-lg pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full h-12 bg-[#252525] border border-white/10 rounded-lg pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full h-12 bg-[#252525] border border-white/10 rounded-lg pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
                                <select
                                    className="w-full h-12 bg-[#252525] border border-white/10 rounded-lg pl-10 pr-10 text-white appearance-none focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all cursor-pointer"
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    value={form.role}
                                >
                                    <option value="JOB_SEEKER">Job Seeker</option>
                                    <option value="EMPLOYER">Employer</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                            </div>
                        </div>

                        <button className="w-full h-12 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                            Register
                        </button>
                    </form>

                    <p className="text-sm text-center text-zinc-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-white hover:text-gray-200 underline underline-offset-4 transition-colors"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;