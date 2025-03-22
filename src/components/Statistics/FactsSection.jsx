import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Import your Firebase config
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

const FactsSection = () => {
  const [counterData, setCounterData] = useState({
    studentsTaught: 0,
    totalPlacements: 0,
    studentsInIT: 0,
    placementAssistance: 0,
  });

  useEffect(() => {
    const fetchCounterData = async () => {
      const docRef = doc(db, "counterStats", "factsData"); // Firestore path
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCounterData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchCounterData();
  }, []);

  const countUp = (id, endValue) => {
    const element = document.getElementById(id);
    let startValue = 0;
    const increment = endValue / 100;

    const interval = setInterval(() => {
      startValue += increment;
      if (startValue >= endValue) {
        clearInterval(interval);
        element.innerText = endValue;
      } else {
        element.innerText = Math.floor(startValue);
      }
    }, 10);
  };

  useEffect(() => {
    if (counterData.studentsTaught !== 0) {
      countUp("studentsCounter", counterData.studentsTaught);
    }
    if (counterData.totalPlacements !== 0) {
      countUp("placementCounter", counterData.totalPlacements);
    }
    if (counterData.studentsInIT !== 0) {
      countUp("studentCounter", counterData.studentsInIT);
    }
    if (counterData.placementAssistance !== 0) {
      countUp("assistanceCounter", counterData.placementAssistance);
    }
  }, [counterData]);

  return (
    <section className="countdown section py-16" id="fact">
      <div className="container mx-auto">
        <div className="row mb-8">
          <div className="col-12 text-center">
            <div className="section-title">
              <h2 className="text-4xl font-bold text-gray-800">
                Some <span className="text-primary">Facts</span>
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Techpile excels in Placements with its dedicated Mentors. Trainees get a blend of mentorship,
                <br /> real-world exposure, and networking opportunities, equipping them for a successful career transition.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Students Taught */}
          <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
            <i className="fa-solid fa-user text-4xl text-primary mb-4"></i>
            <h2 className="count text-3xl font-semibold text-gray-800" id="studentsCounter">
              0
            </h2>
            <p className="text-gray-600">Students taught so far</p>
          </div>

          {/* Total Placements */}
          <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
            <i className="fa-solid fa-user-graduate text-4xl text-primary mb-4"></i>
            <h2 className="count text-3xl font-semibold text-gray-800" id="placementCounter">
              0
            </h2>
            <p className="text-gray-600">Total Placements</p>
          </div>

          {/* Students in IT Companies */}
          <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
            <i className="fa-solid fa-building text-4xl text-primary mb-4"></i>
            <h2 className="count text-3xl font-semibold text-gray-800" id="studentCounter">
              0
            </h2>
            <p className="text-gray-600">Students placed in Top IT Companies</p>
          </div>

          {/* Placement Assistance */}
          <div className="single-count text-center bg-white shadow-lg rounded-lg p-6">
            <i className="fa-solid fa-handshake text-4xl text-primary mb-4"></i>
            <h2 className="count text-3xl font-semibold text-gray-800" id="assistanceCounter">
              0
            </h2>
            <p className="text-gray-600">Placement Assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FactsSection;
