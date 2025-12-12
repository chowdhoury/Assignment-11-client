import { Rating, Star } from "@smastrom/react-rating";
import React from "react";
import { CgProfile } from "react-icons/cg";

const ReviewCard = () => {
  const [ratingValue, setRatingValue] = React.useState(3);
  const customStyles = {
    itemShapes: Star,
    itemStrokeWidth: 2,
    activeFillColor: "var(--color-primary)",
    inactiveStrokeColor: "var(--color-primary)",
    activeStrokeColor: "var(--color-primary)",
  };
  return (
    <div className="flex gap-5 mx-10">
      <figure>
        {/* <img src="" alt="" /> */}
        <CgProfile className="w-20 h-20 rounded-full text-primary" />
      </figure>
      <div>
        <div className="flex gap-5 items-center mb-2">
          <div>
            <h2 className="text-secondary text-xl font-semibold">
              Reviewer Name
            </h2>
            <p className="text-secondary-content text-[14px]">
              February 10, 2024 at 2:37 pm
            </p>
          </div>
          <div>
            <Rating
              readOnly
              style={{ maxWidth: 180 }}
              value={ratingValue}
              onChange={(selectedValue) => setRatingValue(selectedValue)}
              itemStyles={customStyles}
            />
          </div>
        </div>
        <p className="text-secondary-content">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
          asperiores consequatur, quo dolor quos laborum, quod nobis sint nulla
          tempore architecto. Optio sint a nemo consectetur esse ipsam. Magni,
          dolore.
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
