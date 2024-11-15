import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineAppstoreAdd, AiOutlineFileText } from 'react-icons/ai';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInterns, setTotalInterns] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

     
  useEffect(()=>{
       const fetchIsAdmin = () =>
       {
        try{

        }
        catch(e)
        {
          console.log(e);
        }
       }
  },[]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsCollection = collection(db, 'blogs');
        const blogsSnapshot = await getDocs(blogsCollection);
        setTotalBlogs(blogsSnapshot.size); // Size of the collection is the total count of blogs

        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        setTotalUsers(usersSnapshot.size); // Size of the collection is the total count of users

        const internsCollection = collection(db, 'internships'); // Collection for Interns
        const internsSnapshot = await getDocs(internsCollection);
        setTotalInterns(internsSnapshot.size); // Size of the collection is the total count of interns

        const contactsCollection = collection(db, 'contacts');
        const contactsSnapshot = await getDocs(contactsCollection);
        setTotalContacts(contactsSnapshot.size); // Size of the collection is the total count of contacts
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []); // Empty array ensures this effect runs only once


  // Bar Chart Data
  const barData = {
    labels: ['Blogs', 'Users', 'Interns', 'Contacts'],
    datasets: [
      {
        label: 'Total Count',
        data: [totalBlogs, totalUsers, totalInterns, totalContacts],
        backgroundColor: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B'],
        borderColor: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B'],
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ['Blogs', 'Users', 'Interns', 'Contacts'],
    datasets: [
      {
        data: [totalBlogs, totalUsers, totalInterns, totalContacts],
        backgroundColor: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B'],
        borderColor: ['#4A90E2', '#7ED321', '#F5A623', '#D0021B'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <h1 className="mb-6 text-4xl font-bold text-center text-blue-600">Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Blogs */}
        <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Total Blogs</h2>
            <p className="text-3xl font-bold text-blue-600">{totalBlogs}</p>
          </div>
          <div className="p-3 text-blue-600 bg-blue-100 rounded-full">
            <AiOutlineFileText size={40} />
          </div>
        </div>

        {/* Total Users */}
        <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
            <p className="text-3xl font-bold text-green-600">{totalUsers}</p>
          </div>
          <div className="p-3 text-green-600 bg-green-100 rounded-full">
            <AiOutlineUser size={40} />
          </div>
        </div>

        {/* Total Interns */}
        <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Total Interns</h2>
            <p className="text-3xl font-bold text-purple-600">{totalInterns}</p>
          </div>
          <div className="p-3 text-purple-600 bg-purple-100 rounded-full">
            <AiOutlineAppstoreAdd size={40} />
          </div>
        </div>

        {/* Total Contacts */}
        <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Total Contacts</h2>
            <p className="text-3xl font-bold text-orange-600">{totalContacts}</p>
          </div>
          <div className="p-3 text-orange-600 bg-orange-100 rounded-full">
            <AiOutlineShoppingCart size={40} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-2">
        {/* Bar Chart */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Data Overview (Bar Chart)</h3>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Data Breakdown (Pie Chart)</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
