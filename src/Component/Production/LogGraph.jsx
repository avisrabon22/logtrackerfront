import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";

const LogGraph = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center my-8">Welcome to IIMI</h1>
            <div className="flex justify-center space-x-4">
                <div className="bg-green-200 p-4 rounded-lg shadow-lg">
                    <BarChart />
                </div>
                <div className="bg-green-200 p-4 rounded-lg shadow-lg">
                    <PieChart />
                </div>
            </div>
        </div>
    );
}

export default LogGraph;