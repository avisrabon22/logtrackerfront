import { useEffect, useState } from "react";
import LogApi from "../../Services/LogApi";
import { toast } from "react-toastify";

const LogBoard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try{
                const response = await LogApi.getLogs();
                setLogs(response.data);
            }
            catch(error){
                toast.error("Error in fetching logs",{autoClose:1500});
            }

        };

        fetchLogs();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold text-center my-8">Welcome To IIMI</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by username"
                    className="p-2 border border-gray-300 rounded"
                    onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        setLogs((prevLogs) =>
                            prevLogs.filter((log) =>
                                log.username.toLowerCase().includes(searchTerm)
                            )
                        );
                    }}
                />
            </div>
            <table className="min-w-full bg-slate-50 border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-green-800">ID</th>
                        <th className="px-4 py-2 border border-green-800">Username</th>
                        <th className="px-4 py-2 border border-green-800">Device Name</th>
                        <th className="px-4 py-2 border border-green-800">Device Type</th>
                        <th className="px-4 py-2 border border-green-800">Log Id</th>
                        <th className="px-4 py-2 border border-green-800">Log Date</th>
                        <th className="px-4 py-2 border border-green-800">Log Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(logs) && logs.map((log) => (
                        <tr key={log.id} className="border border-black hover:bg-gray-400">
                            <td className="border border-black px-4 py-2 border-b">{log.id}</td>
                            <td className="border border-black px-4 py-2 border-b">{log.username}</td>
                            <td className="border border-black px-4 py-2 border-b">{log.device_name}</td>
                            <td className="border border-black px-4 py-2 border-b">{log.device_type}</td>
                            <td className="border border-black px-4 py-2 border-b">{log.log_id}</td>
                            <td className="border border-black px-4 py-2 border-b">{log.log_date}</td>
                            <td className="border border-black px-4 py-2 border-b">{log.log_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogBoard;
