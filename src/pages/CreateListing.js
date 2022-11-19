import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  type: "sell",
  name: "",
  bedrooms: 1,
  bathrooms: 1,
  parking: false,
  furnished: false,
  address: "",
  description: "",
  offer: false,
  regular_price: 0,
  discounted_price: 0,
  images: [],
  latitude: 0,
  longitude: 0,
};

const buttonStyle =
  "px-7 py-3 w-full rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-200 ease-in-out text-sm uppercase focus:shadow-lg";
const inputStyle = `px-4 py-2 text-gray-700 text-xl transition duration-200 ease-in-out`;

export const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const handleOnchange = (e) => {
    const { id, value, files } = e.target;

    let boolValue = null;
    if (value === true) {
      boolValue = true;
    }
    if (value === false) {
      boolValue = false;
    }
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    }
    if (!files) {
      setFormData((prev) => ({
        ...prev,
        [id]: boolValue ?? value,
      }));
    }
  };
  const [formData, setFormData] = useState(initialState);
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    address,
    description,
    regular_price,
    discounted_price,
    images,
    longitude,
    latitude,
  } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (+regular_price < +discounted_price) {
        setLoading(false);
        toast.error("discounted price cannot be higher than the regular price");
        return;
      }
      if (images.length > 6) {
        setLoading(false);
        toast.error("Maximum 6 images are allowed");
        return;
      }
      let geolocation = {};
      let location;
      if (geolocationEnabled) {
        const key = process.env.REACT_APP_GEOCODING_API_KEY;
        const response = await fetch(
          `https:maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
        );
        const data = await response.json();
        const { results, status } = data;
        geolocation.lat = results[0]?.geometry.location.lat ?? 0;
        geolocation.lng = results[0]?.geometry.location.lng ?? 0;
        location = status === "ZERO_RESULTS" && undefined;
        if (location === undefined) {
          setLoading(false);
          toast.error("PleAudioScheduledSourceNodease enter a correct address");
          return;
        }
      } else {
        geolocation.lat = latitude;
        geolocation.lng = longitude;
      }
      const imageUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Could not upload image");
        return;
      });
      const res = await addDoc(collection(db, "listings"), {
        ...formData,
        parking,
        furnished,
        offer,
        geolocation,
        images: imageUrls,
        longitude: geolocation.lat,
        latitude: geolocation.lng,
        userRef: auth.currentUser.uid,
      });

      setLoading(false);
      toast.success("Listing created");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.currentUser.uid}-${image?.name}-${uuidv4()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  return (
    <main className="max-w-md mx-auto mt-6  pb-11 bg-white shadow-lg mb-32 rounded-3xl border border-blue-900">
      <div className=" bg-blue-900 flex items-center p-4 justify-center rounded-t-3xl">
        <h1 className="text-3xl text-center font-bold text-white">
          Create a listing
        </h1>
      </div>
      <div className="px-4 pt-4">
        <form onSubmit={handleSubmit}>
          <div className="mt-7">
            <p>Sale/Rent</p>
            <div className="flex gap-4 mt-7">
              <button
                value="sale"
                id="type"
                type="button"
                onClick={handleOnchange}
                className={`${buttonStyle} ${
                  type === "sale"
                    ? "bg-slate-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                Sale
              </button>
              <button
                value="rent"
                id="type"
                type="button"
                onClick={handleOnchange}
                className={`${buttonStyle} ${
                  type === "rent"
                    ? "bg-slate-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                Rent
              </button>
            </div>
          </div>
          <div className="mt-7">
            <p className="font-semibold">Name</p>
            <input
              onChange={handleOnchange}
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              minLength={10}
              maxLength={32}
              className={`${inputStyle} w-full`}
            />
          </div>
          <div className=" flex gap-4 items-center mt-7">
            <div className="">
              <p className="font-semibold">Bedrooms</p>
              <input
                onChange={handleOnchange}
                type="number"
                id="bedrooms"
                value={bedrooms}
                className={inputStyle}
                max={50}
                min={1}
              />
            </div>
            <div className="">
              <p className="font-semibold">Bathrooms</p>
              <input
                onChange={handleOnchange}
                type="number"
                id="bathrooms"
                value={bathrooms}
                className={inputStyle}
                max={50}
                min={1}
              />
            </div>
          </div>
          <div className="mt-7">
            <p>Parking Spot</p>
            <div className="flex gap-4 mt-7">
              <button
                value={parking}
                id="parking"
                type="button"
                onClick={() => setParking(true)}
                className={`${buttonStyle} ${
                  parking ? "bg-slate-600 text-white" : "bg-white text-black"
                }`}
              >
                Yes
              </button>
              <button
                value={parking}
                id="parking"
                type="button"
                onClick={() => setParking(false)}
                className={`${buttonStyle} ${
                  parking ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div className="mt-7">
            <p>Furnished</p>
            <div className="flex gap-4 mt-7">
              <button
                value={true}
                id="furnished"
                type="button"
                onClick={() => setFurnished(true)}
                className={`${buttonStyle} ${
                  !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                value={false}
                type="button"
                id="furnished"
                onClick={() => setFurnished(false)}
                className={`${buttonStyle} ${
                  furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div className="mt-7">
            <p className="font-semibold">Address</p>
            <input
              onChange={handleOnchange}
              type="text"
              id="address"
              value={address}
              placeholder="Address"
              className={`${inputStyle} w-full`}
            />
          </div>
          {geolocationEnabled && (
            <div className="flex items-center gap-5">
              <div className="">
                <p className="text-gray-600">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={handleOnchange}
                  min={-90}
                  max={90}
                  className={`${inputStyle} w-full`}
                />
              </div>
              <div className="">
                <p className="text-gray-600">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={handleOnchange}
                  min={-180}
                  max={180}
                  className={`${inputStyle} w-full`}
                />
              </div>
            </div>
          )}
          <div className="mt-7">
            <p className="font-semibold">Description</p>
            <textarea
              onChange={handleOnchange}
              type="text"
              id="description"
              value={description}
              placeholder="Description"
              rows={5}
              className={`${inputStyle} w-full`}
            ></textarea>
          </div>
          <div className="mt-7">
            <p>Offer</p>
            <div className="flex gap-4 mt-7">
              <button
                value={true}
                type="button"
                id="offer"
                onClick={() => setOffer(true)}
                className={`${buttonStyle} ${
                  !offer ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                value={false}
                id="offer"
                type="button"
                onClick={() => setOffer(false)}
                className={`${buttonStyle} ${
                  offer ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
              >
                No
              </button>
            </div>
          </div>
          <div className="  mt-7">
            <div className="">
              <p className="font-semibold">Regular Price</p>
              <div className="flex items-center">
                <input
                  onChange={handleOnchange}
                  type="number"
                  id="regular_price"
                  value={regular_price}
                  className={inputStyle}
                  max={9999999999}
                  min={1}
                />
                <span className="text-gray-500 text-xs">$/month</span>
              </div>
            </div>
            <div className="">
              <p className="font-semibold">Discounted Price</p>
              <div className="flex items-center">
                <input
                  onChange={handleOnchange}
                  type="number"
                  id="discounted_price"
                  value={discounted_price}
                  className={inputStyle}
                  max={9999999999}
                  min={1}
                />
                <span className="text-gray-500 text-xs">$/month</span>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <p className="font-semibold">Image</p>
            <p className="font-thin text-gray-700 text-xs">
              The first image will be the cover (max 6)
            </p>
            <input
              onChange={handleOnchange}
              type="file"
              id="images"
              // hidden
              // value={images}
              className={inputStyle}
              multiple
              required
            />
          </div>
          <button
            type="submit"
            className={`${buttonStyle} bg-blue-900 text-white mt-4`}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};
