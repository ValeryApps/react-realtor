import React from "react";
import { FcGoogle } from "react-icons/fc";

export const OAuth = ({ text }) => {
  return (
    <button className="flex w-full bg-red-600 text-white rounded-lg justify-center items-center py-2 hover:bg-red-800 translate duration-500 ease-in-out hover:font-bold hover:text-red-300 ">
      <FcGoogle className="mr-3 text-3xl" />
      <span>{text}</span>
    </button>
  );
};
