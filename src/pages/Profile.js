import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const disabled =
  "bg-gray-200 border border-gray-600 px-4 py-2 text-xl w-full text-gray-500 rounded";
const enabled =
  "bg-white border border-blue-600 px-4 py-2 text-xl w-full text-gray-700 rounded transition ease-in-out";
export const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editForm, setEditForm] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  //   const handleOnchange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };
  const handleSubmit = async () => {};
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const { currentUser } = getAuth();
        const { displayName, email } = currentUser;
        setEmail(email);
        setName(displayName);
      } catch (error) {}
    };
    loadData();
  }, []);

  return (
    <>
      <section className="container">
        <h1 className="text-3xl font-bold mt-3 text-center">User Profile</h1>
        <form className="md:w-1/2 sm:w-full ml-auto mr-auto gap-4 flex flex-col shadow-md p-5 mt-3">
          <input
            disabled={!editForm}
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={editForm ? enabled : disabled}
          />
          <input
            disabled={!editForm}
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={editForm ? enabled : disabled}
          />
          {editForm ? (
            <button type="submit">Save changes</button>
          ) : (
            <div className="flex justify-between">
              <div>
                <span>Do you change your name?</span>
                <span
                  className="text-red-500 hover:text-red-800 transition duration-500 ease-in-out cursor-pointer ml-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditForm(true);
                  }}
                >
                  Edit
                </span>
              </div>
              <span
                onClick={handleLogout}
                className="text-blue-500 hover:text-blue-800 transition duration-500 ease-in-out cursor-pointer"
              >
                logout
              </span>
            </div>
          )}
        </form>
      </section>
    </>
  );
};
