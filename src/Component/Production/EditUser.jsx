import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserApi from "../../Services/UserApi";
import { toast } from "react-toastify";
import RoleApi from "../../Services/RoleApi";

const EditUser = () => {
  const { id } = useParams();
  const ref = useRef(null);
  const [user, setUser] = useState({
    id: "",
    username: "",
    password: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    getRoles();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await UserApi.getUser(id);
      if (response.status === 200) {
        setUser({
          id: id,
          username: response.data.username,
          password: "",
          role: response.data.role,
        });
      } else {
        if (!ref.current)
          toast.error(response.response.data, { autoClose: 1500 });
        ref.current = true;
      }
    } catch (error) {
      if (!ref.current)
        toast.error("Something went wrong", { autoClose: 1500 });
      ref.current = true;
    }
  };
  const getRoles = async () => {
    try {
      const response = await RoleApi.getRoles();

      if (response.status === 200) {
        setRoles(response.data);
      } else {
        if (!ref.current) {
          toast.error(response.response.data);
        }
        ref.current = true;
      }
    } catch (error) {
      if (!ref.current) {
        ref.current = true;
        toast.error("Something went wrong", { autoClose: 1500 });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(user);
      const response = await UserApi.updateUser(user);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.username + " updated", { autoClose: 1500 });
        navigate("/users");
      } else {
        toast.error(response.response.data, { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("Something went wrong", { autoClose: 1500 });
    }
  };

return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="id"
                >
                    Id
                </label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={user.id}
                    onChange={handleChange}
                    readOnly
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                >
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
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
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
            <div>
                <label htmlFor="role" className="sr-only">
                    Role
                </label>

                <select
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                            <option
                                    key={role.id}
                                    value={role.roleName}
                            >
                                    {role.roleName}
                            </option>
                            ))}
                </select>
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
