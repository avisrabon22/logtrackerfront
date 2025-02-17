import React, { useEffect, useRef, useState } from 'react';
import RoleApi from '../../Services/RoleApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Role = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ref = useRef(null);

    const getRoles = async () => {
        try {
            const response = await RoleApi.getRoles();
            if (response.status !== 200) {
                if(!ref.current){
                    ref.current=true;
                    toast.error(response.response.data,{autoClose: 1500});
                    setError(response.response.data);
                    console.log(response);
                }
            } else {
                setRoles(response.data);
                console.log(response);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteRole = async (id) => {
        try {
            const response = await RoleApi.deleteRole(id);
            if (response.status === 200) {
                toast.success(`Role: '${response.data.roleName}' deleted`);
                setRoles(roles.filter(role => role.id !== id));
            } else {
                toast.error(response.response.data);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Role</h1>
            <table className="min-w-full text-center bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Role ID</th>
                        <th className="py-2 px-4 border-b">Role Name</th>
                        <th className="py-2 px-4 border-b">Edit</th>
                        <th className="py-2 px-4 border-b">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(roles) && roles.map((role) => (
                        <tr key={role.id}>
                            <td className="py-2 px-4 border-b">{role.id}</td>
                            <td className="py-2 px-4 border-b">{role.roleName}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => window.location.href = `/update-role/${role.id}`}
                                >
                                    Update
                                </button>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleDeleteRole(role.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {error && <div className="text-red-500">{error}</div>}
            <Link to="/add-role"><button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add Role</button></Link> 
        </div>
    );
};

export default Role;
