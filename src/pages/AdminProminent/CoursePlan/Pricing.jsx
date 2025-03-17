import { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Import the Firestore instance
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
import { toast } from "react-toastify"; // Optional for notifications

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    priceMonthly: "",
    priceYearly: "",
    subtitle: "",
  });
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({ text: "", status: "active" });
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle popup visibility
  const [isEditMode, setIsEditMode] = useState(false); // State for edit mode
  const [editingPlanId, setEditingPlanId] = useState(null); // Store the ID of the plan being edited

  useEffect(() => {
    const fetchPricingPlans = async () => {
      const pricingPlansRef = collection(db, "pricingPlans");
      const snapshot = await getDocs(pricingPlansRef);
      const pricingList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPricingPlans(pricingList);
    };

    fetchPricingPlans();
  }, []);

  const handleAddPricingPlan = async () => {
    try {
      const pricingPlansRef = collection(db, "pricingPlans");
      await addDoc(pricingPlansRef, {
        ...newPlan,
        offers: offers,
      });
      toast.success("Pricing plan added successfully!");
      setNewPlan({
        name: "",
        priceMonthly: "",
        priceYearly: "",
        subtitle: "",
      });
      setOffers([]);
    } catch (error) {
      toast.error("Error adding pricing plan");
      console.error(error);
    }
  };

  const handleDeletePricingPlan = async (id) => {
    try {
      const pricingPlanRef = doc(db, "pricingPlans", id);
      await deleteDoc(pricingPlanRef);
      toast.success("Pricing plan deleted successfully!");
    } catch (error) {
      toast.error("Error deleting pricing plan");
      console.error(error);
    }
  };

  const handleAddOffer = () => {
    setOffers([...offers, newOffer]);
    setNewOffer({ text: "", status: "active" });
  };

  const handleDeleteOffer = (index) => {
    const updatedOffers = offers.filter((_, i) => i !== index);
    setOffers(updatedOffers);
  };

  const handleEditPricingPlan = async () => {
    try {
      const pricingPlanRef = doc(db, "pricingPlans", editingPlanId);
      await updateDoc(pricingPlanRef, {
        ...newPlan,
        offers: offers,
      });
      toast.success("Pricing plan updated successfully!");
      setIsPopupOpen(false);
      setEditingPlanId(null);
      setNewPlan({
        name: "",
        priceMonthly: "",
        priceYearly: "",
        subtitle: "",
      });
      setOffers([]);
    } catch (error) {
      toast.error("Error updating pricing plan");
      console.error(error);
    }
  };

  const handleEditClick = (plan) => {
    setNewPlan({
      name: plan.name,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
      subtitle: plan.subtitle,
    });
    setOffers(plan.offers);
    setEditingPlanId(plan.id);
    setIsEditMode(true);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsEditMode(false);
    setNewPlan({
      name: "",
      priceMonthly: "",
      priceYearly: "",
      subtitle: "",
    });
    setOffers([]);
  };

  return (
    <div className="admin-panel bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Admin Panel</h2>

      {/* Add Pricing Plan Button */}
      <div className="mb-4 flex justify-end">
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          onClick={() => setIsPopupOpen(true)}
        >
          Add New Pricing Plan
        </button>
      </div>

      {/* Pricing Plan Form Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">
              {isEditMode ? "Edit Pricing Plan" : "Add New Pricing Plan"}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Package Name</label>
              <input
                type="text"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                placeholder="Package Name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              />
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Price (Monthly)</label>
                <input
                  type="text"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Price (Monthly)"
                  value={newPlan.priceMonthly}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, priceMonthly: e.target.value })
                  }
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Price (Yearly)</label>
                <input
                  type="text"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Price (Yearly)"
                  value={newPlan.priceYearly}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, priceYearly: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                placeholder="Subtitle"
                value={newPlan.subtitle}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, subtitle: e.target.value })
                }
              />
            </div>

            {/* Offers Section */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-3">Offers</h4>
              <div className="flex space-x-4">
                <input
                  type="text"
                  className="w-3/4 p-3 border border-gray-300 rounded-md"
                  placeholder="Offer Text"
                  value={newOffer.text}
                  onChange={(e) => setNewOffer({ ...newOffer, text: e.target.value })}
                />
                <select
                  className="w-1/4 p-3 border border-gray-300 rounded-md"
                  value={newOffer.status}
                  onChange={(e) => setNewOffer({ ...newOffer, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  className="bg-primary text-white p-3 rounded-md hover:bg-primary-dark"
                  onClick={handleAddOffer}
                >
                  Add Offer
                </button>
              </div>

              {/* Display Offers */}
              <div className="mt-4">
                {offers.map((offer, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200"
                  >
                    <span className="text-sm">{offer.text} - {offer.status}</span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteOffer(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                onClick={isEditMode ? handleEditPricingPlan : handleAddPricingPlan}
              >
                {isEditMode ? "Save Changes" : "Add Pricing Plan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Pricing Plans */}
      <div className="pricing-list bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Existing Pricing Plans</h3>
        {pricingPlans.map((plan) => (
          <div key={plan.id} className="pricing-plan mb-4 p-4 border rounded-md shadow-sm">
            <h4 className="text-xl font-semibold">{plan.name}</h4>
            <p>{plan.subtitle}</p>
            <p className="text-sm text-gray-600">Monthly Price: {plan.priceMonthly}</p>
            <p className="text-sm text-gray-600">Yearly Price: {plan.priceYearly}</p>

            {/* Display Offers for this plan */}
            <div className="mt-4">
              <h5 className="font-semibold">Offers</h5>
              {plan.offers.map((offer, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {offer.text} - {offer.status}
                </div>
              ))}
            </div>

            <div className="mt-2 flex space-x-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                onClick={() => handleEditClick(plan)}
              >
                Edit Plan
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDeletePricingPlan(plan.id)}
              >
                Delete Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
