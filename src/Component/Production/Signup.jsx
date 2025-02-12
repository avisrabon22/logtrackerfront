import React, { useEffect, useRef, useState } from 'react'
import UserApi from '../../Services/UserApi';
import { toast } from 'react-toastify';
import RoleApi from '../../Services/RoleApi';

const Signup = () => {
    const ref = useRef(null);
    const [signup, setSignup] = useState({
        username: "",
        password: "",
        role: "",
    });

    const [roles, setRoles] = useState([]);

    const getRoles = async () => {
        try {
            const response = await RoleApi.getRoles();

            if (response.status === 200) {
                setRoles(response.data);
            }
            else {
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
      }
    

    useEffect(() => {
        getRoles();
    }, []);


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const updatedSignup = {
      ...signup,
      username: e.target.username.value,
      password: e.target.password.value,
      role: e.target.option.value,
    };
    setSignup(updatedSignup);
    addUser(updatedSignup);
  };

    const addUser = async (user) => {
        try {
            const response = await UserApi.signup(user);
            // console.log(response);
            if (response.status === 200) {
                toast.success(`User: ${response.data.username} has been created successfully`,{autoClose:1500});
            }
            else {
                toast.error(response.response.data,{autoClose:1500});
            }
        } catch (error) {
            toast.error("Something went wrong",{autoClose:1500});
        }
    }



    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSignupSubmit}>
                <h1 className='flex items-center justify-center font-bold text-3xl'>Signup</h1>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>

                    <div>
                        <label htmlFor="option" className="sr-only">Role</label>

                        <select id="option" name="option" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.roleName}>{role.roleName}</option>
                            ))}
                        </select>

            <select
              id="option"
              name="option"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );

};
export default Signup;
