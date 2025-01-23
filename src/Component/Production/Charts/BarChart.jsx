import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import LogApi from '../../../Services/LogApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BarChart = () => {
    const [logs,setLogs]=useState([]);
    const [backgroundColor, setBackgroundColor] = useState([]);
    useEffect(() => {
        fetchLogs();
    }
    , []);

    const fetchLogs=async()=>{ 
    try{
            const response= await LogApi.getLogs();
            if(response.data.length===0){
                toast.error("No data available");
            }
            setLogs(response.data);
            

        }catch(error){
            toast.error("Error in fetching data");
        }
}
//  set the data for the chart
    const chartData={
        labels: logs.length>0?logs.map((log) => log.device_name):[],
        datasets:
            [
                {
                    label: "Device",
                    data: logs.length>0?logs.map((log) => log.log_id):[],
                //    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                //      borderColor: 'rgba(255, 99, 132, 1)',
                },
            ],
    }
     
    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Device Name'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Log ID'
                },
                beginAtZero: true // Start y-axis at 0
            }
        },
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to adjust to its container's size
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Device Logs',
            },
        },
    };
    return (
        <div>
            <Bar data={chartData} options={chartOptions}/>
        </div>
    );
}

export default BarChart;