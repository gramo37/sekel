import { useQuery } from "@tanstack/react-query";
import { PRODUCTS } from "../constants";
import Loading from "../components/Loading";
import ProductItem from "../components/ProductItem";
import Error from "../components/Error";
import { fetchProducts } from "../utils/api.helper";

export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: [PRODUCTS],
    queryFn: fetchProducts,
    enabled: PRODUCTS.length > 0,
  });

  if (isLoading) return <Loading />;
  if (!data) return <Error message="Something went wrong" />;
  return (
    <>
      <div className="flex justify-center lg:justify-start items-center flex-wrap">
        {data?.map((item) => {
          return <ProductItem key={item.id} {...item} />;
        })}
      </div>
    </>
  );
}
