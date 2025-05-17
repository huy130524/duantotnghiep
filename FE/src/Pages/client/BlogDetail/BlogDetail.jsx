import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { getImageUrl2 } from "../../../utils/image";
import dayjs from "dayjs";

const BlogDetail = () => {
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["BLOG_DETAIL", params?.slug],
    queryFn: () => api.get(`/blog/${params?.slug}`),
    enabled: !!params?.slug,
  });

  return (
    <>
      <section className="page-title o-hidden tw-bg-[url(/images/bg/02.jpg)]">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <h1 className="mb-3">
                Blog <span className="text-theme">Detail</span>
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
                    Blog Detail
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
              <div className="col-md-12">
                <div className="left-side">
                  <div className="post-image">
                    <img
                      className="img-fluid w-100 tw-h-[500px] tw-object-cover"
                      src={getImageUrl2(data?.image)}
                      alt=""
                    />
                    <div className="post-date">
                      {dayjs(data?.createdAt).date()}{" "}
                      <span>{dayjs(data?.createdAt).format("MMMM")}</span>
                    </div>
                  </div>
                  <div className="blog-details">
                    <div className="post-desc">
                      <div className="post-title">
                        <h3 className="mb-3">{data?.title}</h3>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{ __html: data?.content }}
                      ></p>
                    </div>

                    <div className="post-comments mt-5 pos-r">
                      <div className="section-title mb-4">
                        <h3 className="title">
                          Leave A <span>Comment</span>
                        </h3>
                      </div>
                      <form
                        id="contact-form"
                        method="post"
                        action="https://themeht.com/template/oveltyshop/html/ltr/contact.php"
                      >
                        <div className="messages" />
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                id="form_name"
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required="required"
                                data-error="Name is required."
                              />
                              <div className="help-block with-errors" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                id="form_email"
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                required="required"
                                data-error="Valid email is required."
                              />
                              <div className="help-block with-errors" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                id="form_subject"
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Subject"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea
                                id="form_message"
                                name="message"
                                className="form-control"
                                placeholder="Your Comment"
                                rows={4}
                                required="required"
                                data-error="Please,leave us a message."
                                defaultValue={""}
                              />
                              <div className="help-block with-errors" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <button className="btn btn-theme">
                              <span>Post Comment</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*blog end*/}
        {/*newsletter start*/}
        <section className="theme-bg py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <h2 className="title">
                  News<span>letter</span>
                </h2>
              </div>
              <div className="col-lg-8 col-md-12 md-mt-3">
                <div className="subscribe-form">
                  <form id="mc-form" className="group row align-items-center">
                    <div className="col-sm-8">
                      <input
                        type="email"
                        defaultValue=""
                        name="EMAIL"
                        className="email box-shadow"
                        id="mc-email"
                        placeholder="Email Address"
                        required=""
                      />
                    </div>
                    <div className="col-sm-4 xs-mt-1">
                      <input
                        className="btn btn-white"
                        type="submit"
                        name="subscribe"
                        defaultValue="Subscribe"
                      />
                    </div>
                    <label htmlFor="mc-email" className="subscribe-message" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*newsletter end*/}
      </div>
    </>
  );
};

export default BlogDetail;
