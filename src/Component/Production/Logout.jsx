import React from 'react';


const Logout = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div>
                <p className='text-3xl font-bold p-10'> Are you want to logout ...</p>
            </div>
            <div className="text-center">
                <button
                    onClick={() => {
                        // Add your logout logic here
                        console.log('User logged out');
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Logout;