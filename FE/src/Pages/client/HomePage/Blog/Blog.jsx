const Blog = () => {
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
          <div className="col-lg-4 col-md-12">
            <div className="post">
              <div className="post-image">
                <img
                  className="img-fluid w-100"
                  src="images/blog/01.jpg"
                  alt=""
                />
                <div className="post-date">
                  23 <span>Apr</span>
                </div>
              </div>
              <div className="post-desc">
                <div className="post-title">
                  <h5>
                    <a href="blog-single.html">Ligula sed magna</a>
                  </h5>
                </div>
                <p>
                  Cras ultricies ligula sed magna dictum porta, Sed ut
                  perspiciatis unde omnis iste natus error sit voluptat
                </p>{" "}
                <a className="post-btn" href="blog-single.html">
                  Read More
                  <i className="ml-2 fas fa-long-arrow-alt-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 md-mt-5">
            <div className="post">
              <div className="post-image">
                <img
                  className="img-fluid w-100"
                  src="images/blog/02.jpg"
                  alt=""
                />
                <div className="post-date">
                  23 <span>Apr</span>
                </div>
              </div>
              <div className="post-desc">
                <div className="post-title">
                  <h5>
                    <a href="blog-single.html">Perspiciatis unde omnis</a>
                  </h5>
                </div>
                <p>
                  Cras ultricies ligula sed magna dictum porta, Sed ut
                  perspiciatis unde omnis iste natus error sit voluptat
                </p>{" "}
                <a className="post-btn" href="blog-single.html">
                  Read More
                  <i className="ml-2 fas fa-long-arrow-alt-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 md-mt-5">
            <div className="post">
              <div className="post-image">
                <img
                  className="img-fluid w-100"
                  src="images/blog/03.jpg"
                  alt=""
                />
                <div className="post-date">
                  23 <span>Apr</span>
                </div>
              </div>
              <div className="post-desc">
                <div className="post-title">
                  <h5>
                    <a href="blog-single.html">Sed ut perspiciatis</a>
                  </h5>
                </div>
                <p>
                  Cras ultricies ligula sed magna dictum porta, Sed ut
                  perspiciatis unde omnis iste natus error sit voluptat
                </p>{" "}
                <a className="post-btn" href="blog-single.html">
                  Read More
                  <i className="ml-2 fas fa-long-arrow-alt-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
