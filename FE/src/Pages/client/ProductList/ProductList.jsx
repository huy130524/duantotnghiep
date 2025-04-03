import PageTitle from "./PageTitle/PageTitle";
import NewsLetter from "../HomePage/NewsLetter/NewsLetter";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  const { data } = useQuery({
    queryKey: ["PRODUCTS_FILTER", keyword],
    queryFn: async () => {
      if (keyword) {
        const r = await api.get("/products/search", {
          params: {
            query: keyword,
          },
        });

        return r.data;
      }
    },
  });
  console.log("🚀 352 ~ ProductList ~ data:", data);

  useEffect(() => {
    const keyword = searchParams.get("search");
    setKeyword(keyword);
  }, [searchParams]);

  return (
    <>
      <PageTitle keyword={keyword} />

      <div className="page-content">
        <section>
          <div className="container">
            <div className="tw-flex tw-gap-x-3">
              {!keyword && <Sidebar />}

              <Content isSearch={!!keyword} data={data} />
            </div>
          </div>
        </section>

        <NewsLetter />
      </div>
    </>
  );
};

export default ProductList;
