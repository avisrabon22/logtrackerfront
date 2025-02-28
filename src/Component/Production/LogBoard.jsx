import { useEffect, useRef, useState } from "react";
import LogApi from "../../Services/LogApi";
import { toast } from "react-toastify";

const LogBoard = () => {
    const ref = useRef(null);
    const [logs, setLogs] = useState([]);
    const [searchDevice, setSearchDevice] = useState("");
    const [searchEventId, setSearchEventId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await LogApi.getLogs();
                if (response.status === 200) {
                    setLogs(response.data);
                } else {
                    if (!ref.current)
                        toast.error(response.response.data, { autoClose: 1500 });
                    ref.current = true;
                }
            } catch (error) {
                if (!ref.current)
                    toast.error("Error in fetching logs", { autoClose: 1500 });
                ref.current = true;
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const filteredLogs = logs.filter((log) =>
        log.deviceName.includes(searchDevice) &&
        log.eventId.toString().includes(searchEventId)
    );

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold text-center my-8 sticky top-16 bg-white z-10">Log Board</h1>
            <div className="mb-4 sticky top-16 bg-white z-10">
                <input
                    type="text"
                    placeholder="Search by Device Name"
                    className="p-2 border border-gray-300 rounded placeholder-gray-700"
                    value={searchDevice}
                    onChange={(e) => setSearchDevice(e.target.value.toUpperCase())}
                />
                <input
                    type="text"
                    placeholder="Search by Event ID"
                    className="p-2 border border-gray-300 rounded ml-2 placeholder-gray-700"
                    value={searchEventId}
                    onChange={(e) => setSearchEventId(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {filteredLogs.length > 0 ? (
                        <div className="overflow-auto max-h-96">
                            <table className="min-w-full bg-slate-50 border border-gray-200">
                                <thead className="sticky top-0 bg-white z-10">
                                    <tr>
                                        <th className="px-4 py-2 border border-green-800">ID</th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Username
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Device Name
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            IP Address
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">Log Id</th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Log Date
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Log Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(filteredLogs) &&
                                        filteredLogs.map((log) => (
                                            <tr
                                                key={log.id}
                                                className="border border-black hover:bg-gray-400"
                                            >
                                                <td className="border border-black px-4 py-2 border-b">
                                                    {log.id}
                                                </td>
                                                <td className="border border-black px-4 py-2 border-b">
                                                    {log.userName}
                                                </td>
                                                <td className="border border-black px-4 py-2 border-b">
                                                    {log.deviceName}
                                                </td>
                                                <td className="border border-black px-4 py-2 border-b">
                                                    {log.ipAddress}
                                                </td>
                                                <td className="border border-black px-4 py-2 border-b">
                                                    {log.eventId.toString()}
                                                </td>
                                                <td className="border border-black px-4 py-2 border-b">
                                                    {log.eventDate}
                                                </td>
                                                <td className="border border-black px-4 py-2 border-b">
                                                    {log.eventTime}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <>
                            <table className="min-w-full bg-slate-50 border border-gray-200">
                                <thead className="sticky top-16 bg-white z-10">
                                    <tr>
                                        <th className="px-4 py-2 border border-green-800">ID</th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Username
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Device Name
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Device Type
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Log Id
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Log Date
                                        </th>
                                        <th className="px-4 py-2 border border-green-800">
                                            Log Time
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            <p>No logs found or unable to fetch data from the backend.</p>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default LogBoard;
