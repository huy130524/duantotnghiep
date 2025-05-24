import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getImageUrl2 } from "../../../../utils/image";

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
        <div className="row">
          {data?.map((it) => (
            <div className="col-lg-4 col-md-12" key={it.id}>
              <div className="post">
                <div className="post-image">
                  <img
                    className="img-fluid w-100 tw-h-[240px] tw-object-cover"
                    src={getImageUrl2(it.image)}
                    alt=""
                  />
                  <div className="post-date">
                    {dayjs(it.created_at).date()}{" "}
                    <span>{dayjs(it.created_at).format("MMM")}</span>
                  </div>
                </div>
                <div className="post-desc">
                  <div className="post-title">
                    <h5>
                      <Link to={`/blog/${it.slug}`}>{it.title}</Link>
                    </h5>
                  </div>
                  <p>{it.desc}</p>{" "}
                  <Link
                    to={`/blog/${it.slug}`}
                    className="post-btn"
                    href="blog-single.html"
                  >
                    Read More
                    <i className="ml-2 fas fa-long-arrow-alt-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
