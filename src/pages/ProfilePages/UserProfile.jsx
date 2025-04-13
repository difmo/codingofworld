import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/users/userSlice';
import Loader from "@/components/Loader";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if(!user) { 
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-dark dark:to-gray-900">
        Please Login ....
        </div>)}

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-dark dark:to-gray-900">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
            {user.name?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Institution: {user.college}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Language Used: {user.skills}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{user.codingScore || 0}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Coding Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{user.problemSolved || 0}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Problems Solved</div>
          </div>
        </div>
        <div className="mt-6">
          <a
            href={`https://github.com/${user.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
