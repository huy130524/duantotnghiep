import { useQuery } from "@tanstack/react-query";
import NewsLetter from "../HomePage/NewsLetter/NewsLetter";
import { api } from "../../../api/api";
import dayjs from "dayjs";
import { getImageUrl2 } from "../../../utils/image";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data } = useQuery({
    queryKey: ["BLOG_USER"],
    queryFn: () => api.get("/blog-user"),
  });

  return (
    <>
      <section className="page-title o-hidden tw-bg-[url(/images/bg/02.jpg)]">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <h1 className="mb-3">
                Blog <span className="text-theme">Post</span>
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-4 justify-content-end">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="fas fa-home" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Blog</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/*page title end*/}
      {/*body content start*/}
      <div className="page-content">
        {/*blog start*/}
        <section>
          <div className="container">
            <div className="tw-grid tw-grid-cols-12 tw-gap-5">
              {data?.data?.map((it) => (
                <div className="tw-col-span-4" key={it.id}>
                  <div className="post tw-h-full">
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
                      <p className="tw-line-clamp-4">{it.desc}</p>
                      <Link className="post-btn" to={`/blog/${it.slug}`}>
                        Xem thêm
                        <i className="ml-2 fas fa-long-arrow-alt-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/*blog end*/}

        <NewsLetter />
      </div>
    </>
  );
};

export default Blog;
