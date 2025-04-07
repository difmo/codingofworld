import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IconsComponent from "../../components/Icons/Icons";
import CustomInput from "../../components/InputAndButton/CustomInput";
import CustomButton from "../../components/InputAndButton/CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(true); // New state for modal visibility

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setErrorMessage("");
      setLoading(true);

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        if (user.emailVerified) {
          navigate("/");
        } else {
          setErrorMessage("Please verify your email first.");
        }
      } catch (error) {
        console.error("Login error:", error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  // Sign in with Apple (placeholder for future implementation)
  const handleAppleSignIn = () => {
    alert("Apple sign-in integration is not implemented yet.");
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Animation for modal open
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } },
  };

  return (
    <motion.section
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      initial="hidden"
      animate={showModal ? "visible" : "hidden"}
      variants={modalAnimation}
      onClick={handleCloseModal} // Close modal when clicked outside
    >
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to close modal when clicking inside
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-center mb-4 lg:justify-start">
            <p className="mb-0 mr-4 text-lg">Sign in with</p>
          </div>

          {/* Separator */}
          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 font-semibold text-center dark:text-white">
              Or
            </p>
          </div>

          {/* Email Input */}
          <CustomInput
            placeholder={"Enter your email"}
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}

          {/* Password Input */}
          <CustomInput
            placeholder={"Enter your password"}
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}

          {/* Display error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="rememberMe"
              />
              <label htmlFor="rememberMe" className="cursor-pointer">
                Remember me
              </label>
            </div>
            <a href="#!">Forgot password?</a>
          </div>

          {/* Login Button */}
          <div className="text-center lg:text-left">
            <CustomButton
              type="submit"
              text={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />

            {/* Apple Sign-in Button */}
            <div className="my-4 text-center">
              <CustomButton
                type="button"
                text="Sign in with Apple"
                onClick={handleAppleSignIn}
              />
            </div>

            {/* Register Link */}
            <p className="mt-2 text-sm font-semibold">
              Don't have an account?{" "}
              <a
                href="#!"
                className="transition duration-150 ease-in-out text-danger hover:text-danger-600"
                onClick={() => navigate("/auth/signup")}
              >
                Register
              </a>
            </p>

            {/* Cancel Button */}
            
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
}
