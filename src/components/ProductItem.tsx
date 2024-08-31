import { useNavigate } from "react-router-dom";
import { TProduct } from "../types";
import Ratings from "./Ratings";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/reducers/cart.reducer";

export default function ProductItem(props: TProduct) {
  const { id, title, price, category, image, rating, description } = props;
  const navigate = useNavigate();
  const word_limit = 50;
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.cartReducer.products
  );

  const quantity = products.reduce((acc, curr) => {
    if (curr.id === id) acc += 1;
    return acc;
  }, 0);

  const goToDetail = () => {
    navigate(`/product/${id}`);
  };

  const addToCart = () => {
    dispatch(addProduct(props));
  };

  return (
    <div className="border border-gray-200 p-4 m-4 w-[80vw] md:w-[40vw] lg:w-[30vw] min-h-[600px] cursor-pointer flex flex-col justify-end">
      <div
        className="w-full flex justify-center items-center"
        onClick={goToDetail}
      >
        <div className="flex justify-center items-center w-[140px] min-h-[240px]">
          <img className="p-1 object-cover" src={image} alt={title} />
        </div>
      </div>
      <div className="w-full">
        <div className="mx-1 my-2" onClick={goToDetail}>
          <h5 className="text-left font-bold text-lg">
            {title.substring(0, word_limit) +
              (title.length > word_limit ? "..." : "")}
          </h5>
          <h5 className="text-left text-md">
            {description.substring(0, word_limit * 5) +
              (description.length > word_limit * 5 ? "..." : "")}
          </h5>
        </div>
        <div
          className="flex items-center justify-between py-2"
          onClick={goToDetail}
        >
          <Ratings ratings={rating.rate} />
          <span className="font-light text-gray-500 mx-5">
            {rating.count} reviews
          </span>
        </div>
        <div
          className="flex items-center justify-between pr-5 py-2"
          onClick={goToDetail}
        >
          <p className="font-semibold">{category}</p>
          <p className="font-light text-gray-500">₹ {price}</p>
        </div>
        <div className="flex items-center justify-between pr-5 py-2">
          <p className={`${quantity > 0 ? "opacity-1" : "opacity-0"}`}>
            {quantity} Selected
          </p>
          <button
            className="transition-all bg-black text-white p-2 hover:bg-white hover:text-black hover:border hover:border-black"
            onClick={addToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
