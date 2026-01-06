import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle2, Star } from "lucide-react";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
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
                            Unlock your professional potential.
                        </h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            Welcome back to the community where skills meet opportunity.
                            Whether you're scouting for the top 1% of talent or looking for
                            your next career breakthrough, our AI-driven matching engine
                            connects you instantly.
                        </p>
                    </div>
                </div>

                {/* Job Portal UI Mock - Candidate Profile */}
                <div className="absolute top-[40%] left-16 right-0 bottom-[-10%] z-10 perspective-[1000px] pointer-events-none select-none">
                    <div className="relative w-full max-w-md bg-[#1e1e1e] border border-white/10 rounded-xl shadow-2xl transform rotate-x-6 rotate-y-6 -rotate-z-2 scale-100 origin-top-right overflow-hidden p-6">

                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                                    A
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Aadavan</h3>
                                    <p className="text-blue-400 text-sm font-medium">Senior Frontend Engineer</p>
                                    <div className="flex items-center gap-1 mt-1 text-yellow-500 text-xs">
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-gray-500 ml-1">(5.0)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                                98% MATCH
                            </div>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-[#2a2a2a] text-gray-300 text-xs rounded-md border border-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 mb-6 border-t border-b border-white/5 py-4">
                            <div className="text-center">
                                <div className="text-white font-bold">5y</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Exp</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-white font-bold">12</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Projects</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-white font-bold">12-LPA</div>
                                <div className="text-gray-500 text-xs uppercase tracking-wider">Exp. Sal</div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>View Full Profile</span>
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
                            Welcome Back
                        </h2>
                        <p className="text-sm text-gray-400">
                            Enter your details to access your account
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-4">
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
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button className="w-full h-12 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center text-zinc-500 mt-6">
                        No account?{" "}
                        <Link
                            to="/register"
                            className="text-white hover:text-gray-200 underline underline-offset-4 transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;