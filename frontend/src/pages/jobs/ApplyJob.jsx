import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobSeekerProfile } from "../../api/jobSeekerProfile";
import { getPublicJobById } from "../../api/job";
import { applyForJob } from "../../api/application";

const ApplyJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
    });

    useEffect(() => {
        Promise.all([
            getJobSeekerProfile(token),
            getPublicJobById(id),
        ])
            .then(([profileRes, jobRes]) => {
                const profile = profileRes.data;
                setJob(jobRes.data);

                setForm({
                    fullName: profile.fullName || "",
                    email: profile.email || "",
                    phone: profile.phone || "",
                    resumeUrl: profile.resumeUrl || "",
                    coverLetter: "",
                });
            })
            .finally(() => setLoading(false));
    }, [id, token]);


    const submit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await applyForJob(id, { coverLetter: form.coverLetter }, token);
            navigate("/dashboard");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-zinc-400">Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold">Apply for {job.title}</h1>

            <form onSubmit={submit} className="space-y-6 bg-[#181818] p-6 rounded-xl">
                <Input label="Full Name" value={form.fullName} disabled />
                <Input label="Email" value={form.email} disabled />
                <Input label="Phone" value={form.phone} disabled />
                <Input label="Resume URL" value={form.resumeUrl} disabled />

                <div>
                    <label className="block text-sm mb-1 text-zinc-400">
                        Cover Letter
                    </label>
                    <textarea
                        className="w-full h-32 bg-[#121212] border border-zinc-700 rounded-lg p-3"
                        placeholder="Write a short message to the employer..."
                        value={form.coverLetter}
                        onChange={(e) =>
                            setForm({ ...form, coverLetter: e.target.value })
                        }
                        required
                    />
                </div>

                <button
                    disabled={submitting}
                    className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
                >
                    {submitting ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

const Input = ({ label, value, disabled }) => (
    <div>
        <label className="block text-sm mb-1 text-zinc-400">{label}</label>
        <input
            value={value}
            disabled={disabled}
            className="w-full bg-[#121212] border border-zinc-700 rounded-lg p-3 text-zinc-400"
        />
    </div>
);

export default ApplyJob;
