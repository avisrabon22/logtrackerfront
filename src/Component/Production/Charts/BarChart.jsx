import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import LogApi from "../../../Services/LogApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const BarChart = () => {
  const ref = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Log Count",
        data: [],
        backgroundColor: [],
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await LogApi.getLogs();
        if (response.data && response.data.length > 0) {
          processChartData(response.data);
        } else {
          setError("No logs found.");
          if (!ref.current) {
            toast.error("No logs found!!");
          }
          ref.current = true;
        }
      } catch (err) {
        setError("Error fetching logs. Please check the API.");
        if (!ref.current) {
          ref.current = true;
          toast.error("Error fetching logs. Please check the API.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const processChartData = (logsData) => {
    const deviceLogCounts = {}; // Use an object to store counts

    logsData.forEach((log) => {
      const deviceName = log.deviceName || "Unknown Device";
      deviceLogCounts[deviceName] = (deviceLogCounts[deviceName] || 0) + 1;
    });

    const deviceNames = Object.keys(deviceLogCounts);
    const logCounts = Object.values(deviceLogCounts);

    const dynamicColors = deviceNames.map((_, index) => {
      const hue = (index * 137.508) % 360; // Use golden angle approximation for better color distribution
      return `hsl(${hue}, 70%, 50%)`;
    });

    setChartData({
      labels: deviceNames,
      datasets: [
        {
          label: "Number of Logs", // More descriptive label
          data: logCounts,
          backgroundColor: dynamicColors,
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide the legend since the label is clear
        },
        title: {
          display: true,
          text: "Number of Logs per Device", // More descriptive title
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              //Simplified tooltip
              return `Device: ${context[0].label}`;
            },
            label: (context) => {
              return `Logs: ${context.formattedValue}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Device Name",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Logs",
          },
          ticks: {
            stepSize: 1, // Ensure integer ticks on the y-axis
          },
        },
      },
    });
  };

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-green-200 p-4 h-60 rounded-lg shadow-lg w-full">
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
};

export default BarChart;
