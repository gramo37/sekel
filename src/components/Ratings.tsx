import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function Ratings({ ratings }: { ratings: number }) {
  const totalStars = 5;
  const showHalfStar = Math.ceil(ratings) !== ratings;

  return (
    <div className="flex gap-1 justify-center items-center">
      {[...new Array(totalStars)].map((_, index) => {
        return (
          <React.Fragment key={index}>
            {index < ratings ? (
              showHalfStar && Math.ceil(ratings) === index + 1 ? (
                <FaRegStarHalfStroke />
              ) : (
                <FaStar />
              )
            ) : (
              <FaRegStar />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
