import Banner from "./Banner/Banner";
import BestSummerCollection from "./BestSummerCollection/BestSummerCollection";
import Blog from "./Blog/Blog";
import CategoryList from "./CategoryList/CategoryList";
import NewsLetter from "./NewsLetter/NewsLetter";
import ProductAndStart from "./ProductAndStart/ProductAndStart";
import ProductLatest from "./ProductLatest/ProductLatest";
import Services from "./Services/Services";
import Testimonial from "./Testimonial/Testimonial";

const HomePage = () => {
  return (
    <>
      <div className="page-content">
        <Banner />

        <CategoryList />

        <BestSummerCollection />

        <ProductLatest />

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
