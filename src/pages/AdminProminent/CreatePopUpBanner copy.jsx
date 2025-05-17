// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc,writeBatch } from 'firebase/firestore';
// import { db, storage } from '../../firebase'; // Firebase imports
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase Storage imports

// const CreatePopUpBanner = () => {
//   const [imageUrl, setImageUrl] = useState('');
//   const [description, setDescription] = useState('');
//   const [bulletPoints, setBulletPoints] = useState('');
//   const [buttonLink, setButtonLink] = useState('');
//   const [banners, setBanners] = useState([]);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [selectedBanner, setSelectedBanner] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   // Fetch all banners from Firestore
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const bannerRef = collection(db, 'banners');
//         const querySnapshot = await getDocs(bannerRef);
//         const fetchedBanners = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setBanners(fetchedBanners);
//       } catch (error) {
//         console.error('Error fetching banners: ', error);
//       }
//     };

//     fetchBanners();
//   }, []);

//   // Handle image file change
//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   // Upload image to Firebase Storage
//   const uploadImage = async () => {
//     if (!imageFile) return null;

//     const storageRef = ref(storage, `images/${imageFile.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, imageFile);

//     return new Promise((resolve, reject) => {
//       uploadTask.on(
//         'state_changed',
//         null,
//         (error) => reject(error),
//         async () => {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           resolve(downloadURL);
//         }
//       );
//     });
//   };

//   // Handle banner form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const uploadedImageUrl = await uploadImage(); // Upload image and get URL

//       const bannerRef = collection(db, 'banners');
//       await addDoc(bannerRef, {
//         imageUrl: uploadedImageUrl,
//         description,
//         bulletPoints: bulletPoints.split('\n'),
//         buttonLink,
//         createdAt: new Date(),
//         isActive: true, // Default new banner as active
//       });

//       alert('Banner created successfully!');
//       // Reset form after submission
//       setImageUrl('');
//       setDescription('');
//       setBulletPoints('');
//       setButtonLink('');
//       setImageFile(null);
//     } catch (error) {
//       console.error('Error creating banner: ', error);
//       alert('Error creating banner');
//     }
//   };

//   // Handle editing the banner
//   const handleEdit = (banner) => {
//     setSelectedBanner(banner);
//     setIsPopupVisible(true); // Open the edit popup
//     setDescription(banner.description);
//     setBulletPoints(banner.bulletPoints.join('\n'));
//     setButtonLink(banner.buttonLink);
//     setImageUrl(banner.imageUrl);
//   };


//   const handleActivateDeactivate = async (banner) => {
//     const batch = writeBatch(db); // Use writeBatch from the Firestore module
  
//     const bannerRef = doc(db, "banners", banner.id);
//     const updatedIsActive = !banner.isActive; // Toggle active status
  
//     // Add an update operation to the batch
//     batch.update(bannerRef, {
//       isActive: updatedIsActive, // Update the 'isActive' field
//     });
  
//     try {
//       // Commit the batch operation
//       await batch.commit();
//       console.log(`Banner ${updatedIsActive ? "activated" : "deactivated"} successfully!`);
      
//       // Update local state to reflect the new status
//       setBanners((prevBanners) =>
//         prevBanners.map((b) =>
//           b.id === banner.id ? { ...b, isActive: updatedIsActive } : b
//         )
//       );
//     } catch (error) {
//       console.error("Error toggling banner status:", error);
//     }
//   };
  

//   // Handle deleting a banner
//   const handleDelete = async (bannerId) => {
//     const bannerRef = doc(db, 'banners', bannerId);
//     await deleteDoc(bannerRef);

//     // Remove from the local state
//     setBanners((prevBanners) =>
//       prevBanners.filter((banner) => banner.id !== bannerId)
//     );
//     alert('Banner deleted successfully');
//   };

//   const handleBannerClick = (banner) => {
//     setSelectedBanner(banner);
//   };

//   const handleClosePopup = () => {
//     setIsPopupVisible(false);
//     setSelectedBanner(null);
//   };

//   const handleOpenPopup = () => {
//     setIsPopupVisible(true);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Existing Banners</h2>

//       {/* Display all banners with a click event to show details */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {banners.map((banner) => (
//           <div key={banner.id} className="cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
//             <img
//               src={banner.imageUrl}
//               alt="Banner"
//               className="w-full h-32 object-cover mb-2 rounded-lg"
//             />
//             <p className="text-lg font-semibold">{banner.description}</p>
//             <p className={`text-sm ${banner.isActive ? 'text-green-600' : 'text-red-600'}`}>
//               {banner.isActive ? 'Active' : 'Inactive'}
//             </p>
//             <div className="mt-2 flex justify-between">
//               <button
//                 onClick={() => handleEdit(banner)}
//                 className="text-indigo-600 hover:text-indigo-800"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleActivateDeactivate(banner)}
//                 className={`${
//                   banner.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
//                 }`}
//               >
//                 {banner.isActive ? 'Deactivate' : 'Activate'}
//               </button>
//               <button
//                 onClick={() => handleDelete(banner.id)}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Button to open the popup to create a new banner */}
//       <button
//         onClick={handleOpenPopup}
//         className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
//       >
//         +
//       </button>

//       {/* Popup Modal for Banner Form */}
//       {isPopupVisible && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//             <h2 className="text-2xl font-semibold mb-4">Create Pop-Up Banner</h2>
//             <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//               <div>
//                 <label className="block font-medium text-gray-700">Image:</label>
//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-gray-700">Description:</label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-gray-700">Bullet Points (separate with new lines):</label>
//                 <textarea
//                   value={bulletPoints}
//                   onChange={(e) => setBulletPoints(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium text-gray-700">Button Link:</label>
//                 <input
//                   type="text"
//                   value={buttonLink}
//                   onChange={(e) => setButtonLink(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
//               >
//                 Create Banner
//               </button>
//             </form>
//             <button
//               onClick={handleClosePopup}
//               className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatePopUpBanner;
