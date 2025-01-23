import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/BarChart";

const LogGraph = () => {
   
    return (
        <div>
            <h1 className="text-4xl font-bold text-center my-8">Welcome to IIMI</h1>
            <div className="flex justify-center space-x-4">
                <BarChart />
            </div>
        </div>
    );
}

export default LogGraph;