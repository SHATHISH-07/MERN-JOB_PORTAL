import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 overflow-x-hidden">

            {/* Subtle Grid Background instead of Blurs for structure */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* NAVBAR */}
            <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white rounded-sm"></div>
                        <h1 className="text-lg font-bold tracking-tighter">JOBPORTAL_</h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <a href="#features" className="hover:text-white transition">Product</a>
                        <a href="#how-it-works" className="hover:text-white transition">Workflow</a>
                        <a href="#pricing" className="hover:text-white transition">Enterprise</a>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition">
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="bg-white text-black px-5 py-2 rounded text-sm font-semibold hover:bg-zinc-200 transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">

                <div className="inline-block px-3 py-1 mb-8 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
                    <span className="text-xs font-mono text-zinc-300 tracking-wider">v2.0 NOW AVAILABLE FOR TEAMS</span>
                </div>

                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                    Hire the top 1% <br />
                    <span className="text-white block mt-2">without the noise.</span>
                </h2>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light">
                    The precision recruitment platform. We utilize algorithmic matching to connect rigorous professionals with world-class engineering teams.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-24">
                    <Link
                        to="/register"
                        className="bg-white text-black h-12 px-8 rounded font-semibold hover:bg-zinc-200 transition flex items-center justify-center"
                    >
                        Find a Job
                    </Link>
                    <Link
                        to="/register"
                        className="h-12 px-8 rounded font-semibold border border-white/20 hover:bg-white/5 transition flex items-center justify-center text-zinc-300"
                    >
                        Hiring Manager?
                    </Link>
                </div>

                {/* HERO DASHBOARD MOCKUP */}
                <div className="relative w-full max-w-5xl aspect-[16/9] group">
                    {/* Main Dashboard Card */}
                    <div className="relative w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        {/* Fake Browser Header */}
                        <div className="h-10 bg-[#000] border-b border-white/10 flex items-center px-4 justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                            </div>
                            <div className="text-[10px] font-mono text-zinc-600">dashboard.sys</div>
                        </div>

                        {/* Dashboard Body */}
                        <div className="p-6 grid grid-cols-4 gap-6 h-full font-mono text-xs">
                            {/* Sidebar */}
                            <div className="col-span-1 space-y-2 border-r border-white/5 pr-6">
                                <div className="h-8 w-full bg-white/10 rounded mb-6" />
                                <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                                <div className="h-4 w-1/2 bg-zinc-800 rounded" />
                                <div className="h-4 w-2/3 bg-zinc-800 rounded" />
                            </div>

                            {/* Main Content */}
                            <div className="col-span-3 space-y-6">
                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-24 bg-[#111] border border-white/5 p-4 flex flex-col justify-between">
                                        <div className="text-zinc-500">APPLICANTS</div>
                                        <div className="text-2xl text-white">1,204</div>
                                    </div>
                                    <div className="h-24 bg-[#111] border border-white/5 p-4 flex flex-col justify-between">
                                        <div className="text-zinc-500">INTERVIEWS</div>
                                        <div className="text-2xl text-white">48</div>
                                    </div>
                                    <div className="h-24 bg-[#111] border border-white/5 p-4 flex flex-col justify-between">
                                        <div className="text-zinc-500">OFFERS</div>
                                        <div className="text-2xl text-white">12</div>
                                    </div>
                                </div>

                                {/* List Items */}
                                <div className="space-y-2">
                                    <div className="h-8 w-full bg-[#111] border border-white/5 flex items-center px-4 justify-between">
                                        <span className="text-zinc-500">Candidate_01</span>
                                        <span className="text-green-500">98% Match</span>
                                    </div>
                                    <div className="h-8 w-full bg-[#111] border border-white/5 flex items-center px-4 justify-between">
                                        <span className="text-zinc-500">Candidate_02</span>
                                        <span className="text-zinc-600">Processing...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUSTED BY */}
            <section className="py-12 border-y border-white/10 bg-[#080808]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest shrink-0">Trusted Partners</p>
                    <div className="flex flex-wrap justify-end gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <CompanyLogo name="ACME_CORP" />
                        <CompanyLogo name="GLOBEX_INC" />
                        <CompanyLogo name="SOYLENT" />
                        <CompanyLogo name="INITECH" />
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
                <div className="mb-20">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">System Architecture</h3>
                    <div className="h-1 w-20 bg-white mb-6"></div>
                    <p className="text-zinc-400 max-w-xl text-lg">
                        Our platform removes subjectivity from the hiring process. Data-driven decisions for modern teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    <FeatureCard
                        number="01"
                        title="Verified Profiles"
                        description="Strict vetting protocols. We eliminate spam and verify identity through O-Auth protocols."
                    />
                    <FeatureCard
                        number="02"
                        title="Algorithmic Matching"
                        description="Proprietary matching engine connects jobs with candidates based on raw data points."
                    />
                    <FeatureCard
                        number="03"
                        title="Real-time Analytics"
                        description="Monitor views, applications, and funnel conversion rates with zero latency."
                    />
                    <FeatureCard
                        number="04"
                        title="Global Compliance"
                        description="Automated tax and compliance handling for remote hires in over 100 jurisdictions."
                    />
                    <FeatureCard
                        number="05"
                        title="Collaborative Workspaces"
                        description="Unified dashboard for team ratings, notes, and async hiring decisions."
                    />
                    <FeatureCard
                        number="06"
                        title="Boolean Search"
                        description="Advanced query parameters allowing you to filter by 50+ technical data points."
                    />
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-24 border-t border-white/10 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
                    <div>
                        <div className="text-5xl font-bold text-white mb-2 tracking-tighter">10k+</div>
                        <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Active Positions</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-white mb-2 tracking-tighter">50k+</div>
                        <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Vetted Talent</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-white mb-2 tracking-tighter">98%</div>
                        <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Match Accuracy</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-white mb-2 tracking-tighter">24h</div>
                        <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Avg. Turnaround</div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center border-t border-white/10">
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to deploy?</h3>
                    <p className="text-zinc-400 text-lg mb-12">
                        Initialize your career trajectory or build your dream engineering team today.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-white text-black px-10 py-4 rounded font-bold hover:bg-zinc-200 transition"
                    >
                        Get Started Now
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="px-6 py-12 border-t border-white/10 bg-[#050505] text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-zinc-700"></div>
                            <span className="font-bold text-white tracking-tight">JOBPORTAL_</span>
                        </div>
                        <div className="text-zinc-500 max-w-xs">
                            Designing the future of recruitment through data and design.
                        </div>
                    </div>

                    <div className="flex gap-8 text-zinc-500 font-mono text-xs">
                        <a href="#" className="hover:text-white transition">LEGAL</a>
                        <a href="#" className="hover:text-white transition">PRIVACY</a>
                        <a href="#" className="hover:text-white transition">CONTACT</a>
                    </div>

                    <div className="text-zinc-600 font-mono text-xs">
                        © {new Date().getFullYear()} INC.
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Replaced Icon with Number for professional look
const FeatureCard = ({ number, title, description }) => (
    <div className="bg-[#050505] p-10 hover:bg-[#0a0a0a] transition-colors group">
        <div className="text-zinc-600 font-mono text-sm mb-6 group-hover:text-white transition-colors">
            {number}
        </div>
        <h4 className="text-xl font-bold mb-3 text-white tracking-tight">{title}</h4>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const CompanyLogo = ({ name }) => (
    <div className="font-bold font-sans tracking-tight text-lg">
        {name}
    </div>
);

export default LandingPage;