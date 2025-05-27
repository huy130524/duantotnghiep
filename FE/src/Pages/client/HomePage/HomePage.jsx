import { api } from "../../../api/api";
import Banner from "./Banner/Banner";
import BestSummerCollection from "./BestSummerCollection/BestSummerCollection";
import Blog from "./Blog/Blog";
import CategoryList from "./CategoryList/CategoryList";
import NewsLetter from "./NewsLetter/NewsLetter";
import ProductAndStart from "./ProductAndStart/ProductAndStart";
import ProductLatest from "./ProductLatest/ProductLatest";
import Services from "./Services/Services";
import Testimonial from "./Testimonial/Testimonial";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { data } = useQuery({
    queryKey: ["HOME_CONFIG"],
    queryFn: () => api.get("/home"),
  });

  return (
    <>
      <div className="page-content">
        <Banner data={data?.banners} />

        <CategoryList data={data?.categories} />

        <BestSummerCollection />

        <ProductLatest data={data?.new_products} />

        <Testimonial />

        <ProductAndStart />

        <Blog />

        <Services />

        <NewsLetter />
      </div>
    </>
  );
};

export default HomePage;
