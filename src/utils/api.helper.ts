import axios from "axios";
import { baseURL } from "../constants";
import { TProduct } from "../types";

const api = axios.create({
  baseURL,
});

export default api;

export const fetchProducts = async (): Promise<TProduct[]> => {
  const res = await api.get("/products")
  return res.data;
}