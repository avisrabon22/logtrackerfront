import { useEffect, useState } from "react";

const LogBoard = () => {
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const fetchLogs = async () => {
        const response = await fetch('/api/logs');
        const data = await response.json();
        setLogs(data);
        };
    
        fetchLogs();
    }, []);
    
    return (
        <div className="p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-green-800">ID</th>
                        <th className="px-4 py-2 border border-green-800">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b"></td>
                            <td className="px-4 py-2 border-b"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    };

export default LogBoard