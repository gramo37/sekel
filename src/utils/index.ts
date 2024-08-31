import { CART } from "../constants";
import { TProduct } from "../types";

export const getDataFromLocal = () => {
  return JSON.parse(localStorage.getItem(CART) ?? "[]");
};

export const setDataInLocal = (data: TProduct[]) => {
  localStorage.setItem(CART, JSON.stringify(data));
};

export const getMapData = (products: TProduct[]) => {
  const mapData: { [x: number]: TProduct[] } = {};

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!(product.id in mapData)) {
      mapData[product.id] = [];
    }
    mapData[product.id].push(product);
  }

  return mapData;
};
