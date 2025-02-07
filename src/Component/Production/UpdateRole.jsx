import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoleApi from "../../Services/RoleApi";
import { toast } from "react-toastify";

const UpdateRole = () => {
    const { id } = useParams();
    const [role, setRole] = useState({id:"",roleName:""});

    const getRole = async (id) => {
        try {
            const response = await RoleApi.getRole(id);
            if (response.status === 200) {
            // console.log(response);
                setRole(response.data);
            } else {
                toast.error(response.response.data, { autoClose: 1500 });
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 1500 });
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Add logic to handle form submission
        try {
            const response = await RoleApi.updateRole(role);
            if (response.status === 200) {
                toast.success("'"+role.roleName+"'"+" role updated successfully", { autoClose: 1500 });
            } else {
                toast.error(response.response.data, { autoClose: 1500 });
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 1500 });
        }

    };

    useEffect(() => {
        if (id) {
            getRole(id);
        }
    }, [id]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mb-6">Update Role</h1>
            <form onSubmit={handleSubmit} className="space-y-4 text-center">
                <div className="mb-4">
                    <label htmlFor={role.id} className="block text-gray-700 text-xl font-medium mb-2">Role:</label>
                    <input
                        type="text"
                        id={role.id}
                        value={role.roleName}
                        onChange={(e) => setRole({ ...role, roleName: e.target.value })}
                        className="justify-center w-52 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-52 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update</button>
            </form>
        </div>
    );
}

export default UpdateRole;
