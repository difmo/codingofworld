import React from 'react'

const UserProfile = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg border m-3 shadow">
                <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
                        P
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">pritamkutvh1</h2>
                        <p className="text-sm text-gray-500">Institution: Lucknow University</p>
                        <p className="text-sm text-gray-500">Language Used: C++, C</p>
                    </div>
                </div>
                <div className="mt-6 flex gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold">76</div>
                        <div className="text-sm text-gray-500">Coding Score</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold">30</div>
                        <div className="text-sm text-gray-500">Problem Solved</div>
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default UserProfile