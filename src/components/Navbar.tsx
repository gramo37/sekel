import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { getMapData } from "../utils";

export default function Navbar() {
  const products = useSelector(
    (state: RootState) => state.cartReducer.products
  );
  const [sidebar, setSidebar] = useState(false);
  const mapData = getMapData(products);

  return (
    <>
      <div className={`sticky top-2 w-full flex justify-end ${products.length === 0 && "opacity-0"}`}>
        <div className="cursor-pointer z-40 bg-white flex items-center justify-around mx-10 mt-3 rounded-full p-4 w-fit">
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
