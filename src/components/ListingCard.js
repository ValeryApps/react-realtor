import React from "react";

export const ListingCard = ({ listing }) => {
  return (
    <ul>
      <li>{listing.id}</li>
      <li>{listing.name}</li>
    </ul>
  );
};
