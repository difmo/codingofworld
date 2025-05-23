import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import SubscriptionPopUp from "./SubscriptionPopUp";
import CopyRightText from "./CopyRightText";
import PartnerLogos from "./NewFooter";
import footerData from "./Data";

const Footer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email } = formData;
    const newErrors = {};
    if (!email) newErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await addDoc(collection(db, "subscriptions"), {
        email: formData.email,
        createdAt: new Date(),
      });
      setShowPopup(true);
      setFormData({ email: "" });
      setErrors({});
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark:bg-dark md:pt-60 bg-white pb-3" >

      <footer className=" mx-3 rounded-2xl border p-8  px-4 md:px-10  text-black dark:bg-dark dark:text-white transition-all duration-700 ease-in-out">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-screen-xl   relative mx-auto"
        >
          <PartnerLogos />
          <div className="md:flex md:flex-row gap-10   flex flex-col  ">
            <div className="space-y-4 flex-1">
              <h1 className="text-2xl font-bold">
                Coding of <span className="text-primary">World</span>
              </h1>
              <p className="text-sm">
                Empowering learners with real-world coding skills through expert-led courses in full-stack development and app creation.
              </p>
              <p className="text-sm">
                Explore cutting-edge technologies like AI/ML, IoT, and blockchain with hands-on projects and personalized mentorship.
              </p>
              <p className="text-sm">
                Launch your tech career with industry-aligned curriculum, career guidance, and job-ready training paths.
              </p>
            </div>


            <div className="space-y-4  ">
              <h2 className="text-xl font-bold text-primary">Courses</h2>
             <ul className="space-y-2">
  {footerData.courses.map(({ name, path }) => (
    <li key={name}>
      <LinkItem name={name} path={path} />
    </li>
  ))}
</ul>

            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">Links</h2>
             <ul className="space-y-2">
  {footerData.links.map(({ name, path }) => (
    <li key={name}>
      <LinkItem name={name} path={path} />
    </li>
  ))}
</ul>

            </div>

            {/* Course Section 2 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">Certificates</h2>
             <ul className="space-y-2">
  {footerData.certificates.map(({ name, path }) => (
    <li key={name}>
      <LinkItem name={name} path={path} />
    </li>
  ))}
</ul>

            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary">Get In Touch</h2>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 p-3 text-sm rounded-md text-black dark:text-white bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-primary rounded-md hover:bg-opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Subscribe"}
                </button>
              </form>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

              <div className="flex space-x-4 pt-4">
                {footerData.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl hover:text-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div></div>
          {/* Course Section 1 */}



          <CopyRightText />
          {showPopup && <SubscriptionPopUp />}
        </motion.div>
      </footer>
    </div>
  );
};

export default Footer;
const isExternal = (url) => /^https?:\/\//.test(url);

const LinkItem = ({ name, path }) =>
  isExternal(path) ? (
    <a
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer text-sm hover:text-secondary transition block"
    >
      {name}
    </a>
  ) : (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer text-sm hover:text-secondary transition"
    >
      {name}
    </div>
  );
