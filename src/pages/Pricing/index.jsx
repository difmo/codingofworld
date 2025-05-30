import { useState, useEffect } from "react";
import { db } from "../../firebase"; // Import the Firestore instance
import { collection, getDocs } from "firebase/firestore";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import SectionTitle from "./SectionTitle";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true); // State for monthly/yearly toggle
  const [pricingPlans, setPricingPlans] = useState([]); // State to store pricing plans

  // Fetch pricing data from Firestore
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const pricingPlansRef = collection(db, "pricingPlans");
        const snapshot = await getDocs(pricingPlansRef);
        const plans = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPricingPlans(plans); // Store the fetched plans in state
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      }
    };

    fetchPricingPlans();
  }, []);

  return (
    <section id="pricing" className="relative transition-all duration-700 ease-in-out bg-white md:py-20 lg:py-28 dark:bg-dark">
      <div className="container">
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="The tech industry is constantly evolving, with new innovations shaping the future. Staying updated with the latest trends and continuously developing skills is essential for success in today's fast-paced world."
          center
          width="665px"
        />

       

        <div className="grid grid-cols-1 pt-10 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingBox
              key={plan.id}
              packageName={plan.name}
             price={ plan.priceYearly}
              offerprice={ plan.priceMonthly}
              duration={isMonthly ? "mo" : "yr"}
              subtitle={plan.subtitle}
            >
              {plan.offers.map((offer, index) => (
                <OfferList
                  key={index}
                  text={offer.text}
                  status={offer.status}
                />
              ))}
            </PricingBox>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#FF4F43" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF4F43" />
              <stop offset="1" stopColor="#FF4F43" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
