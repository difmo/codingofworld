import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const LoginUsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          let createdAt = 'N/A';

          if (data.createdAt && typeof data.createdAt.toDate === 'function') {
            createdAt = data.createdAt.toDate().toLocaleString();
          }

          return {
            id: doc.id,
            email: data.email || 'No Email',
            uid: data.uid || 'No UID',
            createdAt,
          };
        });

        setUsers(usersData);
      } catch (err) {
        setError('Error fetching users: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-6xl p-8 mx-auto">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          Users Login Information
        </h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="text-white bg-green-600">
                <tr>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">UID</th>
                  <th className="px-4 py-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td className="px-4 py-2 text-center border">{user.email}</td>
                    <td className="px-4 py-2 text-center border">{user.uid}</td>
                    <td className="px-4 py-2 text-center border">{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginUsersAdmin;
