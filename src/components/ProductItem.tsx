import { useNavigate } from "react-router-dom";
import { TProduct } from "../types";
import Ratings from "./Ratings";
import { useState } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/reducers/cart.reducer";

export default function ProductItem(props: TProduct) {
  const { id, title, price, category, image, rating } = props;
  const navigate = useNavigate();
  const word_limit = 50;
  const [canSwitch, setCanSwitch] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  const goToDetail = () => {
    if (canSwitch) navigate(`/product/${id}`);
  };

  const addToCart = () => {
    console.log("Adding to cart", props)
    dispatch(addProduct(props));
  };

  return (
    <div
      className="border border-gray-200 p-4 m-4 w-[40vw] h-[500px] cursor-pointer flex flex-col justify-end"
      onClick={goToDetail}
    >
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-[140px] min-h-[240px]">
          <img className="p-1 object-cover" src={image} alt={title} />
        </div>
      </div>
      <div className="w-full">
        <div className="mx-1 my-2">
          <h5 className="text-center font-bold text-lg text-ellipsis">
            {title.substring(0, word_limit) +
              (title.length > word_limit && "...")}
          </h5>
        </div>
        <div className="flex items-center justify-between py-2">
          <Ratings ratings={rating.rate} />
          <span className="font-light text-gray-500 mx-5">
            {rating.count} reviews
          </span>
        </div>
        <div className="flex items-center justify-between pr-5 py-2">
          <p className="font-semibold">{category}</p>
          <p className="font-light text-gray-500">₹ {price}</p>
        </div>
        <div className="flex items-center justify-center pr-5 py-2">
          <button
            className="transition-all bg-black text-white p-2 hover:bg-white hover:text-black hover:border hover:border-black"
            onClick={addToCart}
            onMouseEnter={() => {
              if (canSwitch) setCanSwitch(false);
            }}
            onMouseLeave={() => {
              if (!canSwitch) setCanSwitch(true);
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
