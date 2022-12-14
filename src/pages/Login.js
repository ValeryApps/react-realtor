import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OAuth } from "../components/OAuth";

const formStyle = {
  input:
    "w-full text-xl px-3 py-2 bg-white text-gray-700 border-gray-300 rounded-md transition ease-in-out mb-6",
  button:
    "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full cursor-pointer",
  icon: "absolute right-3 top-3 text-xl cursor-pointer",
};

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    const { email, password } = formData;
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-4xl text-center font-bold mt-6 ">Login</h1>
      <div className="flex flex-wrap justify-center items-center px-6 py-12 space-x-6">
        <div className="md:w-[65%] lg:w-[50%] mb-12 md:mb-5">
          <img className="w-full rounded-2xl" src="images/keys.jpg" alt="" />
        </div>
        <div className="md:w-[65%] sm:w-[100%] lg:w-[40%] mb-12 md:mb-5">
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              className={formStyle.input}
              name="email"
              onChange={handleOnChange}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={formStyle.input}
                name="password"
                onChange={handleOnChange}
              />
              {showPassword ? (
                <AiFillEye
                  className={formStyle.icon}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEyeInvisible
                  className={formStyle.icon}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="flex justify-between mb-3">
              <p>
                Don't have an account?{" "}
                <Link
                  className="text-red-700 hover:text-red-300 transition duration-75 ease-in-out whitespace-nowrap text-sm sm:text-lg"
                  to="/register"
                >
                  {" "}
                  Register
                </Link>
              </p>
              <Link
                className="text-blue-700 hover:text-blue-300 transition duration-75 ease-in-out whitespace-nowrap text-sm sm:text-lg"
                to="/forgot-password"
              >
                Forget Password
              </Link>
            </div>
            <input type="submit" value="Sign in" className={formStyle.button} />
            <div className="flex items-center my-4 before:border-t before:flex-1 after:border-t after:flex-1">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth text="Continue with Google" />
          </form>
        </div>
      </div>
    </section>
  );
};
