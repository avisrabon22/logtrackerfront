import React, { useEffect, useRef, useState } from "react";
import LogApi from "../../Services/LogApi";
import { toast } from "react-toastify";

const LogOnBoard = () => {
  const [logOnBoard, setLogOnBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const getLogOnData = async () => {
    try {
      const response = await LogApi.getLogOnBoard();
      if (response.status === 200) {
        setLogOnBoard(response.data);
      } else {
        if (!ref.current)
            toast.error(response.response.data, { autoClose: 1500 });
        ref.current = true;
      }
    } catch (error) {
        if (!ref.current)
         toast.error("Error in fetching Log On Board Data", { autoClose: 1500 });
        ref.current = true;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogOnData();
  }, []);
// console.log(logOnBoard)
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Log On Board</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Event ID</th>
              <th className="py-2 px-4 border-b">Event Name</th>
              <th className="py-2 px-4 border-b">Time Created</th>
              <th className="py-2 px-4 border-b">Date Created</th>
              <th className="py-2 px-4 border-b">IP Address</th>
              <th className="py-2 px-4 border-b">Device Name</th>
            </tr>
          </thead>
          <tbody>  
            {loading? <tr><td colSpan="7" className="text-center">Loading...</td></tr> :         
                Array.isArray(logOnBoard) &&
                    logOnBoard.map((log) => (
                        <tr key={log.id}>
                        <td className="py-2 px-4 border-b">{log.userName}</td>
                        <td className="py-2 px-4 border-b">{log.eventID}</td>
                        <td className="py-2 px-4 border-b">{log.eventName}</td>
                        <td className="py-2 px-4 border-b">{log.timeCreated}</td>
                        <td className="py-2 px-4 border-b">{log.dateCreated}</td>
                        <td className="py-2 px-4 border-b">{log.ipAddress}</td>
                        <td className="py-2 px-4 border-b">{log.computerName}</td>
                        </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogOnBoard;
