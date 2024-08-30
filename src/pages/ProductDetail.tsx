import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../constants";
import { TProduct } from "../types";
import Error from "../components/Error";
import { fetchProducts } from "../utils/api.helper";
import Loading from "../components/Loading";

export default function ProductDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  let products = queryClient.getQueryData([PRODUCTS]) as TProduct[];

  const { data, isLoading, error } = useQuery({
    queryKey: [PRODUCTS],
    queryFn: fetchProducts,
    enabled: !products,
  });

  if (!products && data) products = data;
  if (isLoading) return <Loading />;
  const product = products?.find((prod) => prod.id === Number(id));
  if (error || !product) return <Error />;
  const { id: prod_id } = product;
  return <div>{prod_id}</div>;
}
