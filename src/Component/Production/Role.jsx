import React from 'react';

const Role = ({ roles }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Role</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Role ID</th>
                        <th className="py-2 px-4 border-b">Role Name</th>
                        <th className="py-2 px-4 border-b">Edit</th>
                        <th className="py-2 px-4 border-b">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td className="py-2 px-4 border-b">{role.id}</td>
                            <td className="py-2 px-4 border-b">{role.name}</td>
                            <td className="py-2 px-4 border-b">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add Role</button>
        </div>
    );
};

export default Role;