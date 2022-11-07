import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OAuth } from "../components/OAuth";

const formStyle = {
  input:
    "w-full text-xl px-3 py-2 bg-white text-gray-700 border-gray-300 rounded-md transition ease-in-out mb-6",
  button:
    "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full cursor-pointer",
  icon: "absolute right-3 top-3 text-xl cursor-pointer",
};

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-4xl text-center font-bold mt-6 ">Sign in</h1>
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
              placeholder="Email"
            />

            <div className="flex justify-between mb-2">
              <p>
                Remember password?{" "}
                {/* <Link
                  className="text-red-700 hover:text-red-300 transition duration-75 ease-in-out whitespace-nowrap text-sm sm:text-lg"
                  to="/login"
                >
                  {" "}
          
                </Link> */}
              </p>
              <Link
                className="text-blue-700 hover:text-blue-300 transition duration-75 ease-in-out whitespace-nowrap text-sm sm:text-lg"
                to="/login"
              >
                Sign in instead
              </Link>
            </div>
            <input
              type="submit"
              value="Send Reset Password"
              className={formStyle.button}
            />
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
