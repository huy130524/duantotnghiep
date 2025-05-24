import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getImageUrl2 } from "../../../../utils/image";
import PostItem from "../../../../components/PostItem/PostItem";

const Blog = () => {
  const { data } = useQuery({
    queryKey: ["BLOG_USER_HOME"],
    queryFn: async () => {
      const r = await api.get("/blog-user");

      return r.data?.slice(0, 3) ?? [];
    },
  });

  return (
    <section className="grey-bg">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-8 col-md-12 ml-auto mr-auto">
            <div className="section-title">
              <h2 className="title">
                Latest Fashion <span>Blog</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-12 tw-gap-5">
          {data?.map((it) => (
            <PostItem key={it.id} data={it} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
