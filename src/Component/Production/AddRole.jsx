import { useState } from "react";
import { toast } from "react-toastify";
import RoleApi from "../../Services/RoleApi";

const AddRole = () => {
    const [role, setRole] = useState({ roleName: "" });
    
    const handleRoleSubmit = async (e) => {
               e.preventDefault();
        try {
            const response = await RoleApi.addRole(role);
            if (response.status === 200) {
                toast.success("your role '"+response.data.roleName+"' added successfully !",{autoClose:1500});
                setRole({roleName:""})
            } else {
                toast.error(response.response.data);
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    const roleChange = (e) => {
        setRole({ ...role, roleName: e.target.value });
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Add Role</h1>
            <form
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
                onSubmit={handleRoleSubmit}
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleName">
                        Role Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="roleName"
                        type="text"
                        placeholder="Enter role name"
                        value={role.roleName}
                        onChange={roleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Role
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddRole;