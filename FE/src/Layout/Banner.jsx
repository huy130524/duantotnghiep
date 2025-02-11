import React from "react";

const Banner = () => {
  return (
    <div>
      <section className="fullscreen-banner p-0 o-hidden">
        <div id="slider" className="sl-slider-wrapper">
          <div className="sl-slider">
            <div
              className="sl-slide sl-trans-elems"
              data-orientation="horizontal"
              data-slice1-rotation={-25}
              data-slice2-rotation={-25}
              data-slice1-scale={2}
              data-slice2-scale={2}
            >
              <div className="sl-slide-inner" data-bg-img="images/bg/01.jpg">
                <div className="align-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8 col-md-12">
                        <h5
                          className="slider-label wow fadeInUp mb-2"
                          data-wow-duration="0.7s"
                        >
                          Save Up To 30% Hurry Up
                        </h5>
                        <h1
                          className="mb-4 wow fadeInUp"
                          data-wow-duration="0.9s"
                          data-wow-delay="2s"
                        >
                          New <i>Arrival</i>{" "}
                          <span className="text-black">Fashion</span>
                        </h1>
                        <a
                          className="btn btn-theme btn-iconic animated5"
                          href="#"
                        >
                          <span>
                            Shop Now <i className="fas fa-shopping-cart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="sl-slide"
              data-orientation="vertical"
              data-slice1-rotation={10}
              data-slice2-rotation={-15}
              data-slice1-scale="1.5"
              data-slice2-scale="1.5"
            >
              <div className="sl-slide-inner" data-bg-img="images/bg/02.jpg">
                <div className="align-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8 col-md-12">
                        <h5
                          className="wow fadeInUp mb-2"
                          data-wow-duration="0.7s"
                          data-wow-delay="2s"
                        >
                          Best Offer Of The Month
                        </h5>
                        <h1
                          className="mb-4 wow fadeInUp"
                          data-wow-duration="0.9s"
                          data-wow-delay="3s"
                        >
                          New{" "}
                          <span className="text-white font-italic">
                            Women's
                          </span>{" "}
                          <span className="text-black">Fashion</span> Trends
                        </h1>
                        <a
                          className="btn btn-theme btn-iconic animated5"
                          href="#"
                        >
                          <span>
                            Shop Now <i className="fas fa-shopping-cart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="sl-slide"
              data-orientation="horizontal"
              data-slice1-rotation={3}
              data-slice2-rotation={3}
              data-slice1-scale={2}
              data-slice2-scale={1}
            >
              <div
                className="sl-slide-inner"
                data-bg-img="images/bg/05.jpg"
                style={{ backgroundPosition: "left" }}
              >
                <div className="align-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8 col-md-12 ml-auto text-right">
                        <h5
                          className="wow fadeInUp mb-2"
                          data-wow-duration="0.7s"
                          data-wow-delay="2s"
                        >
                          Get Product New Season
                        </h5>
                        <h1
                          className="mb-4 text-black wow fadeInUp"
                          data-wow-duration="0.9s"
                          data-wow-delay="3s"
                        >
                          Upto 70% Off on{" "}
                          <span className="text-theme">Fashion</span>
                        </h1>
                        <a
                          className="btn btn-theme btn-iconic animated5"
                          href="#"
                        >
                          <span>
                            Shop Now <i className="fas fa-shopping-cart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /sl-slider */}
          <nav id="nav-arrows" className="nav-arrows">
            {" "}
            <span className="nav-arrow-prev">Previous</span>
            <span className="nav-arrow-next">Next</span>
          </nav>
          <nav id="nav-dots" className="nav-dots">
            <span className="nav-dot-current" />
            <span />
            <span />
          </nav>
        </div>
        {/* /slider-wrapper */}
      </section>
    </div>
  );
};

export default Banner;
