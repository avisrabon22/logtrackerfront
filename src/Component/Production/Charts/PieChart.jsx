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
        datasets: [{
            data: [],
            backgroundColor: [],
        }],
    });

    // Fetch logs from the API
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await LogApi.getLogs();
                if (response.data && response.data.length > 0) {
                    const logCounts = response.data.reduce((acc, log) => {
                        acc[log.eventId] = (acc[log.eventId] || 0) + 1;
                        return acc;
                    }, {});

                    const labels = Object.keys(logCounts);
                    const data = Object.values(logCounts);
                    const backgroundColor = labels.map((_, index) => `hsl(${index * 360 / labels.length}, 70%, 50%)`);

                    setLogData({
                        labels,
                        datasets: [{
                            data,
                            backgroundColor,
                        }],
                    });
                }
            } catch (error) {
                toast.error("Error in fetching logs", { autoClose: 1500 });
            }
        };
        fetchLogs();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Logs with type',
            },
        },
    };
    return (
        <div className="bg-green-200 p-4 h-60 rounded-lg shadow-lg w-full">
            <Pie data={logData} options={options} />
        </div>
    );
}

export default PieChart;