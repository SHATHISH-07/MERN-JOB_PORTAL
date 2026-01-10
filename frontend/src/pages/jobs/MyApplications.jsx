import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/application";

const MyApplications = () => {
    const token = localStorage.getItem("token");
    const [apps, setApps] = useState([]);

    useEffect(() => {
        getMyApplications(token).then((res) => setApps(res.data));
    }, [token]);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">My Applications</h2>

            {apps.map((app) => (
                <div
                    key={app._id}
                    className="bg-[#181818] p-4 rounded-lg flex justify-between"
                >
                    <div>
                        <h3 className="font-semibold">{app.jobId.title}</h3>
                        <p className="text-sm text-zinc-400">{app.jobId.location}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-400">
                        {app.status}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default MyApplications;
