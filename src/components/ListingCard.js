import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { formatPrice } from "../utils/formatPrice";

export const ListingCard = ({ listing, id }) => {
  return (
    <div className="relative bg-white rounded-md hover:shadow-xl flex flex-col mb-4 justify-between items-center overflow-hidden transition duration-150 ease-in-out">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition duration-300 ease-in-out"
          src={listing?.images[0]}
          alt=""
          loading="lazy"
        />

        <Moment
          className="absolute left-2 right-2 bg-[#3377cc] text-white uppercase font-semibold text-xs rounded-md py-1 px-2 shadow-md w-28"
          fromNow
          date={listing?.timestamp.toDate()}
        />
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-3">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className=" mt-2 font-semibold text-xl m-0 truncate">
            {listing.name}
          </p>
          <p className="text-[#457b9b] mt-2 font-semibold">
            $
            {listing.offer
              ? formatPrice(listing.discounted_price)
              : formatPrice(listing.regular_price)}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] col-span-3 font-bold text-xs">
            <div className="w-24">
              <p>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"}
              </p>
            </div>
            <div className="w-24">
              <p>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
