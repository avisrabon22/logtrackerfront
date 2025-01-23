import { useEffect, useState } from "react";
import LogApi from "../../../Services/LogApi";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


//  
const PieChart = () => {
    const [logs, setLogs] = useState([]);
    // Fetch logs from the API
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await LogApi.getLogs();
                if (response.data.length === 0) {
                    toast.error("No logs found", { autoClose: 1500 });
                }


                const logCounts = {};
                response.data.forEach(log => {
                    logCounts[log.id] = (logCounts[log.id] || 0) + 1;
                });

                const logIds = Object.keys(logCounts);
                const frequencies = Object.values(logCounts);

                setLogs({
                    labels: logIds,
                    datasets: [
                        {
                            data: frequencies,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)',
                                'rgba(75, 192, 192, 0.8)',
                                'rgba(153, 102, 255, 0.8)',
                                'rgba(255, 159, 64, 0.8)',
                            ],
                        },
                    ],
                });
            } catch (error) {
                toast.error("Error in fetching logs", { autoClose: 1500 });
            }
        };
        fetchLogs();
    }, []);

  


    return (
        <div>
            <h1>Logs Pie</h1>
            <Pie  data={logs} />
        </div>

    );
}

export default PieChart;