import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import signup from "../../assets/images/signup.svg";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/InputAndButton/CustomInput";
import CustomCheckbox from "../../components/InputAndButton/CustomCheckbox";
import CustomButton from "../../components/InputAndButton/CustomButton";
import IconsComponent from "../../components/Icons/Icons";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase"; 
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const waitForEmailVerification = async (user) => {
    try {
      // Poll the user's verification status every 5 seconds
      const interval = setInterval(async () => {
        // Reload the user object to fetch the latest state
        await user.reload(); 
  
        // Check if the email is verified
        if (user.emailVerified) {
          clearInterval(interval);  // Stop polling once verified
          setSuccessMessage("Email successfully verified!");
  
          // Navigate to the login screen after successful verification
          navigate("/loginscreen");
  
        } else {
          console.log("Waiting for email verification...");
        }
      }, 5000); // Poll every 5 seconds (adjust as needed)
  
    } catch (error) {
      console.error("Error checking email verification:", error);
    }
  };
  
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);
  
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
  
        console.log("User:", user);
  
        if (user) {
          // Send the verification email
          await sendEmailVerification(user);
          setSuccessMessage("Verification email sent! Please check your inbox.");
  
          console.log("Please check your inbox for the verification email.");
  
          waitForEmailVerification(user);
  
        } else {
          setErrorMessage("Failed to get a valid user object.");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
  });
  

  return (
    <section className="md:h-screen">
      <div className="flex-col items-center justify-center sm:flex">
        <div className=" md:flex md:w-6/12 lg:w-6/12">
          <img src={signup} className="w-full" alt="Sample" />
        </div>

        <div className="w-full p-4 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign up with</p>
              <IconsComponent IconName={FaFacebookF} />
              <IconsComponent IconName={FaTwitter} />
              <IconsComponent IconName={FaLinkedinIn} />
            </div>

            {/* Separator */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-neutral-300" />
              <p className="mx-4 mb-0 font-semibold text-center">Or</p>
              <div className="flex-1 border-t border-neutral-300" />
            </div>

            <CustomInput 
              placeholder={"Enter your email"} 
              value={formik.values.email} 
              onChange={formik.handleChange("email")} 
              onBlur={formik.handleBlur("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}

            <CustomInput 
              placeholder={"Enter your password"} 
              type="password" 
              value={formik.values.password} 
              onChange={formik.handleChange("password")} 
              onBlur={formik.handleBlur("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <div className="flex items-center justify-between mb-6">
              <CustomCheckbox />
              <a href="#!" className="text-sm">
                Terms and conditions
              </a>
            </div>

            <div className="text-center lg:text-left">
              <CustomButton type="submit" disabled={loading} text={loading ? "Registering..." : "Register"} />
              
              <p className="mt-2 text-sm">
                Have an account?{" "}
                <a
                  href="#!"
                  className="transition duration-150 ease-in-out text-danger hover:text-danger-600"
                  onClick={() => navigate("/loginscreen")}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}