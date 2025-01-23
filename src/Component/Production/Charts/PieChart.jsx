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


//  Pie chart for logs
const PieChart = () => {
    const [logData, setLogData] = useState({
        labels: [],
        datasets: [],
    });

    // Fetch logs from the API
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await LogApi.getLogs();
                console.log(response);
                if (response.data.length === 0) {
                    toast.error("No logs found", { autoClose: 1500 });
                    return; // Exit early if no logs
                }

            


            } catch (error) {
                toast.error("Error in fetching logs", { autoClose: 1500 });
            }
        };
        fetchLogs();
    }, []);

    return (
        <div>
            <h1>Logs Pie</h1>
            <Pie data={logData} options={{ /* Add custom chart options here */ }} />
        </div>
    );
}

export default PieChart;