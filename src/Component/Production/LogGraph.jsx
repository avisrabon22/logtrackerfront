import React, { useEffect, useState } from "react";
import LogApi from "../../Services/LogApi";
import { Line } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LogGraph = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await LogApi.getLogs();
                setLogs(response.data);
            } catch (error) {
                toast.error("Error in fetching logs", { autoClose: 1500 });
            }
        };

        fetchLogs();
    }, []);

    const data = {
        labels: logs.map(log => `${log.log_date} ${log.log_time}`), // Combine date and time for labels
        datasets: [
            {
                label: 'Log Time (Milliseconds)',
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
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.2
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Log graphs by Date and Time',
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
                    text: '<-------- Date and Time ------->'
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
        <div className="p-4">
            <h1 className="text-4xl font-bold text-center my-8">Welcome to IIMI</h1>
            <div className="p-4">
                {
                    (Array.isArray(logs) && logs.length > 0) ? <Line options={options} data={data} />
                        : <h1 className="text-2xl font-bold text-center my-8">No Logs Found</h1>
                }
            </div>
        </div>
    );
}

export default LogGraph;