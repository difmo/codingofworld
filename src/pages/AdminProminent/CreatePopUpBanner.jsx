import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePopUpBanner = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [banners, setBanners] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannerRef = collection(db, 'banners');
        const querySnapshot = await getDocs(bannerRef);
        const fetchedBanners = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBanners(fetchedBanners);
      } catch (error) {
        console.error('Error fetching banners: ', error);
      }
    };

    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bannerRef = collection(db, 'banners');
      await addDoc(bannerRef, {
        title,
        description,
        createdAt: new Date(),
        isActive: true,
      });

      alert('Banner created successfully!');
      setTitle('');
      setDescription('');
      setIsPopupVisible(false);
    } catch (error) {
      console.error('Error creating banner: ', error);
      alert('Error creating banner');
    }
  };

  const handleActivateDeactivate = async (banner) => {
    const batch = writeBatch(db);
    const bannerRef = doc(db, 'banners', banner.id);
    const updatedIsActive = !banner.isActive;

    batch.update(bannerRef, { isActive: updatedIsActive });

    try {
      await batch.commit();
      setBanners((prevBanners) =>
        prevBanners.map((b) =>
          b.id === banner.id ? { ...b, isActive: updatedIsActive } : b
        )
      );
    } catch (error) {
      console.error('Error toggling banner status:', error);
    }
  };

  const handleDelete = async (bannerId) => {
    const bannerRef = doc(db, 'banners', bannerId);
    await deleteDoc(bannerRef);
    setBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== bannerId));
    alert('Banner deleted successfully');
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setTitle(banner.title || '');
    setDescription(banner.description || '');
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedBanner(null);
    setTitle('');
    setDescription('');
  };

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Existing Banners</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold mb-2">{banner.title}</h3>
            <div
              className="text-sm prose max-h-32 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: banner.description }}
            />
            <p className={`text-sm mt-2 ${banner.isActive ? 'text-green-600' : 'text-red-600'}`}>
              {banner.isActive ? 'Active' : 'Inactive'}
            </p>
            <div className="mt-2 flex justify-between">
              <button onClick={() => handleEdit(banner)} className="text-indigo-600 hover:text-indigo-800">
                Edit
              </button>
              <button
                onClick={() => handleActivateDeactivate(banner)}
                className={`${
                  banner.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                }`}
              >
                {banner.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => handleDelete(banner.id)} className="text-red-600 hover:text-red-800">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleOpenPopup}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
      >
        +
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Create Pop-Up Banner</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Description:</label>
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  placeholder="Enter banner content..."
                  className="bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Submit Banner
              </button>
            </form>
            <button
              onClick={handleClosePopup}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePopUpBanner;
