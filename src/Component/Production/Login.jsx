import React, { useId, useState } from "react";

const Login = () => {
    const id=useId();
    const [login, setLogin] = useState({});

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    setLogin({ email, password });
    console.log(login);
};

    

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form  onSubmit={handleSubmit}  className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor={`${id}-email`} className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
                    <input id={`${id}-email`} type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter email" />
                </div>
                <div className="mb-6">
                    <label htmlFor={`${id}-password`} className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input id={`${id}-password`} type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-center justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
            </form>
        </div>
    );
    }

    export default Login;