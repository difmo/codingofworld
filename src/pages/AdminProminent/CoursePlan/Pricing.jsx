import { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import the Firestore instance
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // Firebase Firestore methods
import PricingBox from "../../../pages/Pricing/PricingBox";
import OfferList from "../../../pages/Pricing/OfferList";
import SectionTitle from "../../../pages/Pricing/SectionTitle";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    // Fetch pricing data from Firestore
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "pricing"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPricingData(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // Delete the pricing document from Firebase
    try {
      await deleteDoc(doc(db, "pricing", id));
      setPricingData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting pricing document:", error);
    }
  };

  const handleEdit = (id) => {
    // Navigate to an edit form or update logic
    console.log("Edit pricing with id:", id);
  };

  return (
    <section id="pricing" className="relative -z-50 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
          width="665px"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {pricingData.map((pricing) => (
            <PricingBox
              key={pricing.id}
              packageName={pricing.packageName}
              price={pricing.price}
              duration={isMonthly ? "mo" : "yr"}
              subtitle={pricing.subtitle}
            >
              {pricing.offers.map((offer, index) => (
                <OfferList
                  key={index}
                  text={offer.text}
                  status={offer.status}
                />
              ))}
              <button
                onClick={() => handleEdit(pricing.id)}
                className="mt-3 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pricing.id)}
                className="mt-3 bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </PricingBox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
