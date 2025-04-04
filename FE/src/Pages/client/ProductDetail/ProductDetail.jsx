import { useParams } from "react-router-dom";
import NewsLetter from "../HomePage/NewsLetter/NewsLetter";
import PageTitle from "./PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import Tabs from "./Tabs/Tabs";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import Content from "./Content/Content";

const ProductDetail = () => {
  const { slug } = useParams();

  const { data } = useQuery({
    queryKey: ["PRODUCT_DETAIL", slug],
    queryFn: async () => {
      const r = await api.get(`/products/${slug}`);
      return r;
    },
  });

  return (
    <>
      <PageTitle productName={data?.product.name} />

      <div className="page-content">
        <Content data={data?.product} />

        <Tabs description={data?.product.description} />

        <RelatedProducts data={data?.related_products ?? []} />

        <NewsLetter />
      </div>
    </>
  );
};

export default ProductDetail;
