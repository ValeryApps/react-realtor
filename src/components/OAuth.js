import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export const OAuth = ({ text }) => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      console.log(docSnap);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={signInWithGoogle}
      className="flex w-full bg-red-600 text-white rounded-lg justify-center items-center py-2 hover:bg-red-800 translate duration-500 ease-in-out hover:font-bold hover:text-red-300 "
    >
      <FcGoogle className="mr-3 text-3xl" />
      <span>{text}</span>
    </button>
  );
};
