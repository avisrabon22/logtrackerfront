import React from 'react';


const LogOnBoard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Log On Board</h1>
        
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Username</th>
                            <th className="py-2 px-4 border-b">Event ID</th>
                            <th className="py-2 px-4 border-b">Time Created</th>
                            <th className="py-2 px-4 border-b">Date Created</th>
                            <th className="py-2 px-4 border-b">IP Address</th>
                            <th className="py-2 px-4 border-b">Device Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* Add table rows here */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LogOnBoard;