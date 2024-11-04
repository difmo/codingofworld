import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import signup from "../../assets/images/signup.svg";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/InputAndButton/CustomInput";
import CustomCheckbox from "../../components/InputAndButton/CustomCheckbox";
import CustomButton from "../../components/InputAndButton/CustomButton";
import IconsComponent from "../../components/Icons/Icons";

export default function SingUpScreen() {
  const navigate = useNavigate();
  return (
    <section className="h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="hidden p-12 md:flex md:w-6/12 lg:w-6/12">
          <img src={signup} className="w-full" alt="Sample" />
        </div>

        <div className="w-full md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form>
            <div className="flex items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign up with</p>          
              <IconsComponent IconName={FaFacebookF}/>
              <IconsComponent IconName={FaTwitter}/>
              <IconsComponent IconName={FaLinkedinIn}/>
            </div>

            {/* Separator */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-neutral-300" />
              <p className="mx-4 mb-0 font-semibold text-center">Or</p>
              <div className="flex-1 border-t border-neutral-300" />
            </div>

            <CustomInput placeholder={"Enter your email"} />
            <CustomInput placeholder={"Enter your password"} />

            <div className="flex items-center justify-between mb-6">
              <CustomCheckbox />
              <a href="#!" className="text-sm">
                Terms and conditions
              </a>
            </div>

            <div className="text-center lg:text-left">
           <CustomButton/>

              {/* Register link */}
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
