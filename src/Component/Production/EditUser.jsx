import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import UserApi from '../../Services/UserApi';
import { toast } from 'react-toastify';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        id: '',
        username: '',
        password: '',
        role: ''
    });
    const ref = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(UserApi.getUser(id));
                if (response.status === 200) {
                    setUser({
                        id: response.data.id,
                        username: response.data.username,
                        password: '',
                        role: response.data.role
                    });
                } else {
                    if (!ref.current) {
                        toast.error(response.response.data);
                    }
                    ref.current = true;
                }
            } catch (error) {
                if (!ref.current) {
                    toast.error("Something went wrong");
                }
                ref.current = true;
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(UserApi.UpdateUserApi(id), user);
            if (response.status === 200) {
                toast.success('User updated');
            } else {
                if (!ref.current) {
                    toast.error(response.response.data);
                }
                ref.current = true;
            }
        } catch (error) {
            if (!ref.current) {
                toast.error("Something went wrong");
            }
            ref.current = true;
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                        Id
                    </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={user.id}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Role
                    </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
