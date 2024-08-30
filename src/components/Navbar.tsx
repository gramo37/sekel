import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { TProduct } from "../types";

export default function Navbar() {
  const products = useSelector(
    (state: RootState) => state.cartReducer.products
  );
  const [sidebar, setSidebar] = useState(false);
  const mapData: { [x: number]: TProduct[] } = {};

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!(product.id in mapData)) {
      mapData[product.id] = [];
    }
    mapData[product.id].push(product);
  }

  if (!products || products.length === 0) return null;

  return (
    <>
      <div className="sticky top-2 w-full flex justify-end">
        <div className="cursor-pointer z-50 bg-white flex items-center justify-around mx-10 mt-3 rounded-full p-4 w-fit">
          <div className="relative" onClick={() => setSidebar((prev) => !prev)}>
            <FaShoppingCart className="w-7 h-7 text-gray-500" />
            <p className="font-bold absolute -top-3 -right-4 bg-red-600 p-1 rounded-full text-white text-xs w-6 flex justify-center">
              {Object.keys(mapData).length}
            </p>
          </div>
        </div>
      </div>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
    </>
  );
}
