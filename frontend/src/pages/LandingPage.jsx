import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">

            {/* Subtler Background: Radial Gradient + Faint Noise */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-[#050505] to-[#050505] opacity-70"></div>
                <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%272.5%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27 opacity=%270.05%27/%3E%3C/svg%3E")] opacity-20 mix-blend-soft-light'></div>
            </div>

            {/* NAVBAR */}
            <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-linear-to-tr from-emerald-400 to-blue-500 rounded-md"></div>
                        <h1 className="text-lg font-bold tracking-tight">JOBPORTAL_</h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <a href="#features" className="hover:text-white transition">Product</a>
                        <a href="#stats" className="hover:text-white transition">Stats</a>
                        <a href="#pricing" className="hover:text-white transition">For Employers</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition hidden sm:block">
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-zinc-200 transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO SECTION - NEW SPLIT LAYOUT */}
            <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text Content */}
                <div className="text-left space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        The new standard in recruitment.
                    </div>

                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                        Find your next <br />
                        <span className="bg-linear-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                            career-defining role.
                        </span>
                    </h2>

                    <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                        We use advanced algorithmic matching to connect top-tier talent with world-class engineering teams, removing the noise from the hiring process.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/register"
                            className="bg-white text-black h-12 px-8 rounded-md font-semibold hover:bg-zinc-200 transition flex items-center justify-center"
                        >
                            Find Jobs
                        </Link>
                        <Link
                            to="/register"
                            className="h-12 px-8 rounded-md font-semibold border border-white/10 hover:bg-white/5 hover:border-white/30 transition flex items-center justify-center text-white"
                        >
                            Hire Talent
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center gap-4 text-sm text-zinc-500 font-medium">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-[#050505]"></div>
                            <div className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-[#050505]"></div>
                            <div className="w-8 h-8 rounded-full bg-zinc-600 border-2 border-[#050505] flex items-center justify-center text-xs">+2k</div>
                        </div>
                        <p>Join 2,000+ professionals hired this month.</p>
                    </div>
                </div>

                {/* Right Column: New "Matching Flow" Visual */}
                <div className="relative h-125 w-full hidden md:block perspective-[1000px]">

                    {/* The "Flow" Container */}
                    <div className="absolute inset-0 flex items-center justify-center transform rotate-y-[-10deg] rotate-x-[5deg]">

                        {/* 1. The Talent Pool (Left Stack) */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-4">
                            {/* Card 3 (Back) */}
                            <div className="w-64 p-4 bg-zinc-900/50 border border-white/5 rounded-xl transform translate-x-8 translate-y-4 scale-90 opacity-50 blur-[1px]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
                                    <div className="h-2 w-24 bg-zinc-800 rounded"></div>
                                </div>
                            </div>
                            {/* Card 2 (Middle) */}
                            <div className="w-64 p-4 bg-zinc-900/80 border border-white/10 rounded-xl transform translate-x-4 translate-y-2 scale-95 opacity-70">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-zinc-700 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-28 bg-zinc-700 rounded"></div>
                                        <div className="h-2 w-16 bg-zinc-800 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Card 1 (Front - Active Candidate) */}
                            <div className="relative w-64 p-4 bg-linear-to-br from-zinc-800 to-zinc-900 border border-white/20 rounded-xl shadow-xl z-10">
                                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">APPLICANT</div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-linear-to-tr from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Sarah K.</div>
                                        <div className="text-xs text-zinc-400">Senior React Dev</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded-md text-zinc-300">React</span>
                                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded-md text-zinc-300">Node.js</span>
                                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded-md text-zinc-300">AWS</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. The Matching Engine Gateway (Center) */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                            {/* Glowing ring */}
                            <div className="w-40 h-40 rounded-full border-4 border-blue-500/30 animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                            {/* Connector Lines */}
                            <div className="absolute top-1/2 -left-25 w-30 h-0.5 bg-linear-to-r from-transparent via-blue-500/50 to-blue-500"></div>
                            <div className="absolute top-1/2 `right-25 w-30 h-0.5 bg-linear-to-r from-blue-500 via-emerald-400/50 to-transparent"></div>
                        </div>

                        {/* 3. The Perfect Match (Right) */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                            <div className="relative w-72 p-5 bg-linear-to-br from-zinc-800 to-[#0a0a0a] border border-emerald-500/40 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                                <div className="absolute -top-3 inset-x-0 mx-auto w-max bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                    ✨ 99.2% MATCH FOUND
                                </div>

                                <div className="flex flex-col items-center text-center mt-4">
                                    <div className="w-14 h-14 mb-3 bg-white/10 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                            <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15.75a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15.75zm.75 3a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15.75z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Lead Engineer</h3>
                                    <p className="text-zinc-400 text-sm">At TechCorp • Remote</p>
                                </div>

                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between text-xs text-zinc-400">
                                        <span>Skills Match</span>
                                        <span className="text-emerald-400">Perfect</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-linear-to-r from-blue-500 to-emerald-400 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-md transition">Accept</button>
                                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-md transition">View</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* TRUSTED BY BANNER */}
            <section className="py-10 border-y border-white/5 bg-[#080808]/50 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-sm font-medium text-zinc-500 shrink-0">Trusted by market leaders</p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <CompanyLogo name="Microsoft" />
                        <CompanyLogo name="Airbnb" />
                        <CompanyLogo name="Shopify" />
                        <CompanyLogo name="Discord" />
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section id="features" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Built for modern hiring</h3>
                    <p className="text-zinc-400 max-w-xl text-lg">
                        Our platform streamlines the entire recruitment lifecycle with powerful, data-driven tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.756 3.756 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>}
                        title="Verified Profiles"
                        description="Strict vetting protocols eliminate spam. We verify identity and skills through O-Auth and technical assessments."
                    />
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
                        title="Algorithmic Matching"
                        description="Our proprietary engine connects jobs with candidates based on over 50 raw data points, not just keywords."
                    />
                    <FeatureCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
                        title="Collaborative Hiring"
                        description="Unified dashboards for team ratings, private notes, and async decision-making on candidates."
                    />
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-24 bg-linear-to-b from-[#0a0a0a] to-[#050505] border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                    <StatItem number="15k+" label="Active Roles" />
                    <StatItem number="85k+" label="Vetted Talent" />
                    <StatItem number="98%" label="Placement Rate" />
                    <StatItem number="&lt;48h" label="Avg. Time to Hire" />
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center relative z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-3xl mx-auto relative">
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to find your fit?</h3>
                    <p className="text-zinc-400 text-lg mb-10">
                        Join thousands of companies and job seekers already using our platform.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-white text-black px-10 py-4 rounded-md font-bold hover:bg-zinc-100 hover:scale-105 transition transform duration-200"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="px-6 py-12 border-t border-white/5 bg-[#030303] text-sm relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-linear-to-tr from-emerald-400 to-blue-500 rounded"></div>
                            <span className="font-bold text-white">JOBPORTAL_</span>
                        </div>
                        <div className="text-zinc-500">
                            Connecting talent with opportunity.
                        </div>
                    </div>

                    <div className="flex gap-8 text-zinc-400 font-medium">
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>

                    <div className="text-zinc-600">
                        © {new Date().getFullYear()} Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

// --- Sub-Components ---

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/60 hover:border-blue-500/30 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="text-blue-400 mb-6 bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h4 className="text-xl font-bold mb-3 text-white tracking-tight">{title}</h4>
        <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{description}</p>
    </div>
);

const StatItem = ({ number, label }) => (
    <div>
        <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight bg-linear-to-br from-white to-zinc-400 bg-clip-text ">{number}</div>
        <div className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{label}</div>
    </div>
)

const CompanyLogo = ({ name }) => (
    <div className="font-bold font-sans tracking-tight text-xl text-zinc-300/80">
        {name}
    </div>
);

export default LandingPage;