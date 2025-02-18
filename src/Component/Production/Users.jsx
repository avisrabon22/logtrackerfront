import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../Services/UserApi';
import { toast } from 'react-toastify';


const Users = () => {
    const ref = useRef(null);
    const [users, setUsers] = useState([]);
    const navigate=useNavigate(); 

    useEffect(() => {
        // Fetch users from API
        const fetchUsers = async () => {
            try {
                const response = await UserApi.getUsers();
                if (response.status===200) {
                    setUsers(response.data);
                }
                else {
                    if (!ref.current)
                        toast.error(response.response.data, { autoClose: 1500 });
                    ref.current = true;
                }
            } catch (error) {
                if (!ref.current) {
                    toast.error("Something went wrong", { autoClose: 1500 });
                    ref.current = true;
                }
            }
        };

        fetchUsers();
    }, []);

    const redirectToAddUser = () => {
        navigate('/signup');
    };

    const handleDelete = async (id) => {
        try {
            const response = await UserApi.deleteUser(id);
            if (response.status === 200) {
                toast.success(`User: '${response.data.username}' deleted`);
                setUsers(users.filter(user => user.id !== id));
            } else {
                toast.error(response.response.data);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="p-4">
            <h1 className="flex text-2xl justify-center font-bold mb-4">Users</h1>
            <table className="justify-center min-w-full bg-white">
        <thead>
            <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Username</th>
                <th className="py-2">Role</th>
                <th className="py-2">Actions</th>
            </tr>
        </thead>
        <tbody className='text-center'>
            
            {Array.isArray(users) && users.map((user) => (
                <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                        <button
                            onClick={() => window.location.href= `/edit-user/${user.id}`}
                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
            <button
                onClick={redirectToAddUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add User
            </button>
        </div>
  
    );
};

export default Users;