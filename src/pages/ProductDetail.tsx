import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../constants";
import { TProduct } from "../types";
import Error from "../components/Error";
import { fetchProducts } from "../utils/api.helper";
import Loading from "../components/Loading";
import Ratings from "../components/Ratings";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/reducers/cart.reducer";

export default function ProductDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  let products = queryClient.getQueryData([PRODUCTS]) as TProduct[];

  const { data, isLoading, error } = useQuery({
    queryKey: [PRODUCTS],
    queryFn: fetchProducts,
    enabled: !products,
  });

  if (!products && data) products = data;
  const cart = useSelector((state: RootState) => state.cartReducer.products);
  const quantity = cart?.reduce((acc, curr) => {
    if (curr.id === Number(id)) acc += 1;
    return acc;
  }, 0);

  if (isLoading) return <Loading />;
  const product = products?.find((prod) => prod.id === Number(id));
  if (error || !product) return <Error />;
  const { image, title, description, price, category, rating } = product;
  const addToCart = () => {
    dispatch(addProduct(product));
  };

  return (
    <div className="flex justify-around items-center lg:items-start mt-5 flex-col lg:flex-row">
      <div className="w-[30vw] m-2 mr-5">
        <img src={image} alt={title} />
      </div>
      <div className="lg:w-[45vw] mx-3 p-3">
        <div>
          <h3 className="text-6xl font-bold">{title}</h3>
          <p className="text-4xl text-gray-600">{category}</p>
        </div>
        <div className="flex justify-start items-center gap-2 mt-5 mb-2">
          <p>
            <Ratings ratings={rating.rate} />
          </p>
          <p>{rating.count}</p>
        </div>
        <div>
          <p className="text-2xl">{description}</p>
        </div>
        <div>
          <div>
            <div className="flex justify-between items-center">
              <p className="text-2xl my-3">Price: ₹ {price}</p>
              {quantity > 0 && (
                <p
                  className={`text-xl my-3 font-bold text-gray-800 ${
                    quantity > 0 ? "opacity-1" : "opacity-0"
                  }`}
                >
                  {quantity} Selected
                </p>
              )}
            </div>
            <button
              className="transition-all bg-black text-white w-full px-2 py-4 hover:bg-white hover:text-black hover:border hover:border-black"
              onClick={addToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
