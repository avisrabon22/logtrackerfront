import { useEffect, useState } from "react";
import LogApi from "../../../Services/LogApi";
import { Line } from "react-chartjs-2";
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
import { toast } from "react-toastify";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart=()=>{
    const [logs, setLogs] = useState([]);
    // Fetch logs from the API
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await LogApi.getLogs();
                if (response.data.length === 0) {
                    toast.error("No logs found", { autoClose: 1500 });
                }
                setLogs(response.data);
            } catch (error) {
                toast.error("Error in fetching logs", { autoClose: 1500 });
            }
        };
        fetchLogs();
    }, []);

//  Set Line data
    const LineData = {
        labels: logs.map(log => `${log.log_id}`), // Combine date and time for labels
        datasets: [
            {
                label: 'Log Id',
                data: logs.map(log => {
                    const dateTimeString = `${log.log_date}T${log.log_time}`; // Combine date and time
                    try {
                        const date = new Date(dateTimeString);
                        return date.getTime(); // Convert to milliseconds
                    } catch (error) {
                        console.error("Error parsing date/time:", dateTimeString, error);
                        return null; // Handle parsing errors
                    }
                }),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.2
            },
        ],
    };
// Set option data
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Log Graph',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const logIndex = context.dataIndex;
                        const log = logs[logIndex];
                        if (!log) return null; // Handle potential undefined logs
                        return [
                            `Log ID: ${log.log_id}`,
                            `Date: ${log.log_date}`,
                            `Time: ${log.log_time}`,
                            `Username: ${log.username}`,
                            `Device Type: ${log.device_type}`,
                            `Device Name: ${log.device_name}`
                        ];
                    },
                    title: (context) => { return `Log Details` },
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '<-------- Log Id ------->'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '<------- Log Time (Milliseconds) ------>'
                },
                ticks: {
                    callback: function (value, index, ticks) {
                        return new Date(value).toLocaleTimeString();//Convert to time format
                    }
                }
            }
        }
    };

    return (
        <div className="bg-green-200 p-4 h-60 rounded-lg shadow-lg w-full">
            <Line options={options} data={LineData} />
        </div>
    );

}

export default LineChart;