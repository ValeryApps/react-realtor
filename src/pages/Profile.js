import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { AiOutlineHome } from "react-icons/ai";
import { ListingCard } from "../components/ListingCard";

const disabled =
  "bg-gray-200 border border-gray-600 px-4 mb-4 py-2 text-xl w-full text-gray-500 rounded";
const enabled =
  "bg-white border border-blue-600 px-4 py-2 mb-4 text-xl w-full text-gray-700 rounded transition ease-in-out";
export const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [listings, setListings] = useState([]);
  const auth = getAuth();
  const { currentUser } = auth;
  const navigate = useNavigate();
  ////   const handleOnchange = (e) => {
  ////     const { name, value } = e.target;
  ////     setFormData({ ...formData, [name]: value });
  ////   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser.displayName !== name) {
        await updateProfile(currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
        toast.success("username updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const { displayName, email } = currentUser;
        setEmail(email);
        setName(displayName);
      } catch (error) {}
    };
    loadData();
  }, [currentUser]);

  useEffect(() => {
    const fetchUserListing = async () => {
      let list = [];
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const { docs } = await getDocs(q);

      list = docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      setListings(list);
    };
    fetchUserListing();
  }, [currentUser.uid]);

  return (
    <>
      <section className="container">
        <h1 className="text-3xl font-bold mt-3 text-center">User Profile</h1>
        <div className="md:w-1/2 sm:w-full ml-auto mr-auto gap-4 flex flex-col shadow-md p-5 mt-3">
          <form onSubmit={handleSubmit}>
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
              <button type="submit">Apply changes</button>
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
          <button
            onClick={() => navigate("/create-listing")}
            className="flex justify-center gap-3 items-center bg-blue-700 hover:bg-blue-900 transition duration-300 ease-in-out text-white font-bold py-2 rounded shadow-sm hover:shadow-lg"
          >
            <AiOutlineHome
              size={30}
              className="bg-transparent border-2 border-white rounded-full p-1"
            />
            Sell or rent your home
          </button>
        </div>
      </section>
      <div className="max-w-6xl mt-6 mx-auto">
        <h1 className="text-4xl text-center">My Listings</h1>
        <div className="sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 mt-6 mb-6 space-x-2 mx-2">
          {listings.length > 0 &&
            listings.map((listing) => (
              <div key={listing.id}>
                <ListingCard listing={listing.data} id={listing.id} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
