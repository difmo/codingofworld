import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import login from "../../assets/images/login.svg"
import { useNavigate } from "react-router-dom";
import IconsComponent from "../../components/Icons/Icons"
import CustomInput from "../../components/InputAndButton/CustomInput"
import CustomButton from "../../components/InputAndButton/CustomButton"

export default function LoginScreen() {
    const navigate = useNavigate();
  return (
    <section className="md:h-screen ">
      <div className="container flex flex-wrap items-center justify-center h-full lg:justify-between">
        <div className="mb-12 pt-28 md:w-9/12 lg:w-6/12">
          <img
            src={login}
            className="w-full"
            alt="Sample"
          />
        </div>

        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12">
          <form>
            <div className="flex items-center justify-center mb-4 lg:justify-start">
              <p classNae="mb-0 mr-4 text-lg">Sign in with</p>
              <IconsComponent IconName={FaFacebookF}/>
              <IconsComponent IconName={FaTwitter}/>
              <IconsComponent IconName={FaLinkedinIn}/>
            </div>
m
            {/* Separator */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 font-semibold text-center dark:text-white">
                Or
              </p>
            </div>

            <CustomInput/>
            <CustomInput/>


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

            {/* Login button */}
            <div className="text-center lg:text-left">
            <CustomButton/>

              {/* Register link */}
              <p className="mt-2 text-sm font-semibold">
                Don't have an account?{" "}
                <a
                  href="#!"
                  className="transition duration-150 ease-in-out text-danger hover:text-danger-600"
                  onClick={()=>navigate("/signupscreen")}
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
