import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";

const footerData = {
  courses: [
    { name: "App Development", path: "/courses" },
    { name: "Web Development", path: "/courses" },
    { name: "DSA (Logic Building)", path: "/courses" },
    { name: "AI & Machine Learning", path: "/courses" },
    { name: "UI/UX Design", path: "/courses" },
    { name: "Cyber Security", path: "/courses" },
    { name: "Blockchain Fundamentals", path: "/courses" },
    { name: "Robotics & IoT", path: "/courses" },
  ],
  certificates: [
    { name: "Full Stack Developer Certificate", path: "#" },
    { name: "AI & ML Certification", path: "#" },
    { name: "UI/UX Design Certificate", path: "#" },
    { name: "Cyber Security Basics", path: "#" },
  ],
  links: [
    { name: "Our Courses", path: "/courses" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Blog", path: "/blogs/show-blogs" },
    { name: "Careers", path: "https://www.difmo.com/careers" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "https://www.difmo.com/terms-conditions" },
    { name: "Support", path: "https://www.difmo.com/terms-conditions" },
  ],
  socialLinks: [
    { icon: <FaWhatsapp />, url: "https://chat.whatsapp.com/FwZdLFOAPIZDf5xCmvt7RO" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/codingofworld?igsh=Ymo0YWJ3cjRtaDF6" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/codingofworld/" },
    { icon: <FaTwitter />, url: "https://x.com/difmotech" },
    { icon: <FaYoutube />, url: "https://youtube.com/@codingofworld?feature=shared" },
    { icon: <FaFacebook />, url: "https://www.facebook.com/share/1DSToV7PCF/" },
  ],
};

export default footerData;
