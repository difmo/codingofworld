import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import login from "../../assets/images/login.svg";
import { useNavigate } from "react-router-dom";
import IconsComponent from "../../components/Icons/Icons";
import CustomInput from "../../components/InputAndButton/CustomInput";
import CustomButton from "../../components/InputAndButton/CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  return (
    <section className="transition-all duration-700 ease-in-out md:h-screen dark:bg-dark dark:text-white">
      <div className="container flex flex-wrap items-center justify-center h-full lg:justify-between">
        <div className="mb-12 md:w-9/12 lg:w-6/12">
          <img src={login} className="w-full" alt="Sample" />
        </div>

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-center mb-4 lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign in with your</p>
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

           

            {/* Login Button */}
            <div className="mt-8 text-center lg:text-left">
              <CustomButton
                type="submit"
                text={loading ? "Logging in..." : "Login"}
                disabled={loading}
              />

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
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
