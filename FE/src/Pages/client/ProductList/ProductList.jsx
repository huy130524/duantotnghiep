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
  const [category, setCategory] = useState({ name: "", id: "" });
  const [sortBy, setSortBy] = useState("latest");

  const { data } = useQuery({
    queryKey: ["PRODUCTS_FILTER", keyword, category.id, sortBy],
    queryFn: async () => {
      if (keyword) {
        const r = await api.get("/products/search", {
          params: {
            query: keyword,
          },
        });

        return r.data;
      }

      if (category.id) {
        const r = await api.get(`/categories/${category.id}/products`);
        setCategory({
          ...category,
          name: r.category,
        });

        return r.products;
      }

      const r = await api.get("/products/filter", {
        params: {
          sort_by: sortBy,
        },
      });

      return r.data.data;
    },
  });

  useEffect(() => {
    const keyword = searchParams.get("search");
    const categoryId = searchParams.get("category");

    setKeyword(keyword);
    setCategory({
      id: categoryId,
    });
  }, [searchParams]);

  return (
    <>
      <PageTitle keyword={keyword} category={category.name} />

      <div className="page-content">
        <section>
          <div className="container">
            <div className="tw-flex tw-gap-x-3">
              {!keyword && (
                <Sidebar
                  activeCategory={category.id}
                  onCategoryChange={(categoryId) => {
                    setCategory({ ...category, id: categoryId });
                  }}
                />
              )}

              <Content
                isSearch={!!keyword}
                data={data}
                isCategory={category.id}
                onSortChange={setSortBy}
                sortBy={sortBy}
              />
            </div>
          </div>
        </section>

        <NewsLetter />
      </div>
    </>
  );
};

export default ProductList;
