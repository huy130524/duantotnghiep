import { useQuery } from "@tanstack/react-query";
import NewsLetter from "../HomePage/NewsLetter/NewsLetter";
import { api } from "../../../api/api";
import dayjs from "dayjs";
import { getImageUrl2 } from "../../../utils/image";

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
            <div className="row">
              {data?.data?.map((it) => (
                <div className="col-lg-4 col-md-6" key={it.id}>
                  <div className="post">
                    <div className="post-image">
                      <img
                        className="img-fluid w-100 tw-h-[240px] tw-object-cover"
                        src={getImageUrl2(it.image)}
                        alt=""
                      />
                      <div className="post-date">
                        {dayjs(it.createdAt).date()}{" "}
                        <span>{dayjs(it.createdAt).format("MMM")}</span>
                      </div>
                    </div>
                    <div className="post-desc">
                      <div className="post-title">
                        <h5>
                          <a href="blog-single.html">{it.title}</a>
                        </h5>
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: it.content }}></p>
                      <a
                        className="post-btn tw-line-clamp-4"
                        href="blog-single.html"
                      >
                        Xem thêm
                        <i className="ml-2 fas fa-long-arrow-alt-right" />
                      </a>
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
