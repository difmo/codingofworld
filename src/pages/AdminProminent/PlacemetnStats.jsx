import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsCollection = collection(db, "placementStats");
        const statsSnapshot = await getDocs(statsCollection);
        const statsData = statsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center"
            >
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-lg mt-2">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
