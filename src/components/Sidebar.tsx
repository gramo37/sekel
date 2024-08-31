import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { IoMdClose } from "react-icons/io";
import { TProduct } from "../types";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { addProduct, removeProduct } from "../store/reducers/cart.reducer";
import Error from "./Error";

export default function Sidebar({
  sidebar,
  setSidebar,
}: {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const products = useSelector(
    (state: RootState) => state.cartReducer.products
  );
  const mapData: { [x: number]: TProduct[] } = {};
  const dispatch: AppDispatch = useDispatch();

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!(product.id in mapData)) {
      mapData[product.id] = [];
    }
    mapData[product.id].push(product);
  }

  const add_product = (product: TProduct) => {
    dispatch(addProduct(product));
  };

  const remove_product = (product: TProduct) => {
    dispatch(removeProduct(product.id));
  };

  const word_limit = 20;

  return (
    <>
      <div
        className={`w-screen md:w-[80vw] lg:w-[800px] fixed top-0 right-0 h-screen bg-gray-100 bg-opacity-95 transition-all p-4 ${
          sidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <button onClick={() => setSidebar((prev) => !prev)}>
            <IoMdClose className="w-10 h-10 text-red-400" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl text-center my-2 font-bold">Cart Items</h1>
        </div>
        <div className="mt-5 h-[73vh] overflow-auto">
          {products.length > 0 ? (
            Object.keys(mapData).map((key) => {
              const product = mapData[Number(key)][0];
              const quantity = mapData[Number(key)].length;
              const { title, price, image, id, category } = product;
              return (
                <div className="bg-white p-2 flex justify-around my-2" key={id}>
                  <div>
                    <img src={image} width={50} height={50} />
                  </div>
                  <div>
                    <p className="font-bold">
                      {title.substring(0, word_limit) +
                        (title.length > word_limit && "...")}
                    </p>
                    <p className="text-sm text-gray-500">{category}</p>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-xl w-20">₹ {price}</p>
                    <div className="flex justify-around items-center border w-full mt-1">
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          remove_product(product);
                        }}
                      >
                        <FaMinus />
                      </p>
                      {quantity}
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          add_product(product);
                        }}
                      >
                        <FaPlus />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Error message="No items in cart" type="info"/>
          )}
        </div>
        <div className="bg-white p-2 mt-2 flex justify-between items-center">
          <p className="text-xl font-bold">Total</p>
          <p>
            ₹{" "}
            {products
              .reduce((acc, curr) => {
                return acc + curr.price;
              }, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}
