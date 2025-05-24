import { useQuery } from "@tanstack/react-query";
import NewsLetter from "../HomePage/NewsLetter/NewsLetter";
import { api } from "../../../api/api";
import dayjs from "dayjs";
import { getImageUrl2 } from "../../../utils/image";
import { Link } from "react-router-dom";
import PostItem from "../../../components/PostItem/PostItem";

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
                <PostItem key={it.id} data={it} />
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
