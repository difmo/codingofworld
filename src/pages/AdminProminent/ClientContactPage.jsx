import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Import the Firestore instance

const ClientContactPage = () => {
  // State to store contacts data and loading state
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Firestore on mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactData = querySnapshot.docs.map((doc) => doc.data());
        setContacts(contactData);
      } catch (err) {
        setError("Failed to fetch contacts: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div className="text-xl text-center"><Loader/></div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-6xl p-8 mx-auto ">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          Client Contact Information
        </h2>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse shadow-md table-auto">
              <thead className="text-white bg-green-600">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Contact</th>
                  <th className="px-4 py-2 border">Course</th>
                  <th className="px-4 py-2 border">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 text-center border">{contact.name}</td>
                    <td className="px-4 py-2 text-center border">{contact.email}</td>
                    <td className="px-4 py-2 text-center border">{contact.contact}</td>
                    <td className="px-4 py-2 text-center border">{contact.course}</td>
                    <td className="px-4 py-2 text-center border">{contact.message}</td>
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

export default ClientContactPage;
