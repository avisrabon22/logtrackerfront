import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoleApi from "../../Services/RoleApi";
import { toast } from "react-toastify";

const UpdateRole = () => {
    const { id } = useParams();
    const [role, setRole] = useState({});

    const getRole = async (id) => {
        try {
            const response = await RoleApi.getRole(id);
            if (response.status === 200) {
            console.log(response);
                setRole(response.data);
            } else {
                toast.error(response.response.data, { autoClose: 1500 });
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 1500 });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission

    };

    useEffect(() => {
        if (id) {
            getRole(id);
        }
    }, [id]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mb-6">Update Role</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role:</label>
                    <input
                        type="text"
                        id={role.id}
                        value={role.roleName}
                        onChange={(e) => setRole({ ...role, roleName: e.target.value })}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update</button>
            </form>
        </div>
    );
}

export default UpdateRole;
