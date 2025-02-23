import React from "react";

const Main = () => {
  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          {/* Page Head */}
          <div className="page-head">
            <div className="row">
              <div className="col-sm-6 mb-sm-4 mb-3">
                <h3 className="mb-0">Good Morning, Franklin Jr.</h3>
                <p className="mb-0">
                  Here’s what’s happening with your store today
                </p>
              </div>
              <div className="col-sm-6 mb-4 text-sm-end">
                <a
                  href="javascript:voit(0);"
                  className="btn btn-outline-secondary"
                >
                  Add Task
                </a>
                <a href="javascript:voit(0);" className="btn btn-primary ms-2">
                  New Project
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-9">
              <div className="row">
                <div className="col-xl-3 col-lg-6">
                  <div className="card ic-chart-card">
                    <div className="card-header d-block border-0 pb-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">Weekly Sales</h6>
                        <span className="badge badge-sm badge-success light">
                          +2.7%
                        </span>
                      </div>
                      <span className="data-value">$92k</span>
                    </div>
                    <div className="card-body p-0">
                      <div id="handleWeeklySales" className="chart-offset" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card ic-chart-card">
                    <div className="card-header d-block border-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">Total Order</h6>
                        <span className="badge badge-sm badge-info light">
                          +7.2%
                        </span>
                      </div>
                      <span className="data-value">$34.2k</span>
                    </div>
                    <div className="card-body p-0 pb-3">
                      <div id="handleOrderChart" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card ic-chart-card">
                    <div className="card-header d-block border-0 pb-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">Market Share</h6>
                        <span className="badge badge-sm badge-success light">
                          80%
                        </span>
                      </div>
                      <span className="data-value">20M</span>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-between py-2 pe-1">
                      <div className="clearfix">
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            className="me-2"
                            width={13}
                            height={12}
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.5 0L12.6819 4.49139L10.3206 11.7586H2.6794L0.318133 4.49139L6.5 0Z"
                              fill="#0074FF"
                            />
                          </svg>
                          <span className="text-dark fs-13">Mobile</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            className="me-2"
                            width={13}
                            height={12}
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.5 0L12.6819 4.49139L10.3206 11.7586H2.6794L0.318133 4.49139L6.5 0Z"
                              fill="#01BD9B"
                            />
                          </svg>
                          <span className="text-dark fs-13">Laptop</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            className="me-2"
                            width={13}
                            height={12}
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.5 0L12.6819 4.49139L10.3206 11.7586H2.6794L0.318133 4.49139L6.5 0Z"
                              fill="#738293"
                            />
                          </svg>
                          <span className="text-dark fs-13">Cloths</span>
                        </div>
                      </div>
                      <div id="handleMarketShare" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card ic-chart-card">
                    <div className="card-header d-block border-0 pb-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">New Customer</h6>
                        <span className="badge badge-sm badge-success light">
                          15%
                        </span>
                      </div>
                      <span className="data-value">1.2K</span>
                    </div>
                    <div className="card-footer border-0 mt-auto">
                      <h6>Today Customer</h6>
                      <ul className="avtar-list">
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar1.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar2.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar3.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar4.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar5.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar6.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <div className="avatar-label avatar-light avatar-circle">
                            +4K
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h5>People Contact</h5>
                      <form
                        action="https://worldnic.dexignlab.com/action_page.php"
                        className="card-search"
                      >
                        <div className="input-group search-area style-1 wow">
                          <span className="input-group-text">
                            <a href="javascript:void(0);" className="m-0">
                              <i className="flaticon-search-interface-symbol" />
                            </a>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <i className="fa-solid fa-plus" />
                        </button>
                      </form>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-xl-4 col-sm-4 col-6">
                          <div className="avatar-card text-center border-dashed rounded px-2 py-3">
                            <img
                              className="avatar avatar-lg avatar-circle mb-2"
                              src="images/avatar/avatar1.jpg"
                              alt
                            />
                            <h6 className="mb-0">Jordana Niclany</h6>
                            <span className="fs-12">jordan@mail.com</span>
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-4 col-6">
                          <div className="avatar-card text-center border-dashed rounded px-2 py-3">
                            <div className="avatar avatar-label avatar-lg bg-success-light text-success avatar-circle mb-2 mx-auto">
                              KD
                            </div>
                            <h6 className="mb-0">Jacob Jack</h6>
                            <span className="fs-12">jordan@mail.com</span>
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-4 col-6">
                          <div className="avatar-card text-center border-dashed rounded px-2 py-3 bg-purple-light">
                            <img
                              className="avatar avatar-lg avatar-circle mb-2"
                              src="images/avatar/avatar3.jpg"
                              alt
                            />
                            <h6 className="mb-0">Sammy Nico</h6>
                            <span className="fs-12">jordan@mail.com</span>
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-4 col-6">
                          <div className="avatar-card text-center border-dashed rounded px-2 py-3 bg-cream-light">
                            <img
                              className="avatar avatar-lg avatar-circle mb-2"
                              src="images/avatar/avatar4.jpg"
                              alt
                            />
                            <h6 className="mb-0">Gibs Gibsy</h6>
                            <span className="fs-12">jordan@mail.com</span>
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-4 col-6">
                          <div className="avatar-card text-center border-dashed rounded px-2 py-3">
                            <img
                              className="avatar avatar-lg avatar-circle mb-2"
                              src="images/avatar/avatar5.jpg"
                              alt
                            />
                            <h6 className="mb-0">Sam Sammy</h6>
                            <span className="fs-12">jordan@mail.com</span>
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-4 col-6">
                          <div className="avatar-card text-center border-dashed rounded px-2 py-3">
                            <img
                              className="avatar avatar-lg avatar-circle mb-2"
                              src="images/avatar/avatar6.jpg"
                              alt
                            />
                            <h6 className="mb-0">Corey Core</h6>
                            <span className="fs-12">jordan@mail.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-body mb-0">
                      <div id="redial" />
                      <div className="redia-date text-center">
                        <h4>My Progress</h4>
                        <p className="mb-0">
                          Lorem ipsum dolor sit amet, consectetur
                        </p>
                      </div>
                    </div>
                    <div className="card-footer text-center border-0 pt-0">
                      <a href="javascript:void(0);" className="btn btn-primary">
                        More Details
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card blance">
                    <div className="card-header align-items-baseline border-0 pb-0">
                      <div>
                        <h5 className="mb-0">Your Balance</h5>
                        <h4 className="mb-0">$25,217k</h4>
                      </div>
                      <p className="mb-0 fs-14 ms-auto">
                        <span className="text-success">+2.7% </span>than last
                        week
                      </p>
                    </div>
                    <div className="card-body pt-0">
                      <div id="blanceChart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="card saller">
                <div className="card-header border-0 d-block text-white pb-0">
                  <h4 className="text-white mb-0">Top Sellers</h4>
                  <span>Users from all channels</span>
                </div>
                <div className="card-body overflow-hidden">
                  <div className="seller-slider">
                    <div className="swiper mySwiper swiper-lr">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt1.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt2.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt3.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt4.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-details">
                    <h4>Your Finances, safe and Secure</h4>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.
                    </p>
                    <div className="d-flex align-items-center">
                      <ul className="avtar-list">
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar1.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar2.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar3.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar4.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar5.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <img
                            className="avatar avatar-circle borderd"
                            src="images/avatar/avatar6.jpg"
                            alt
                          />
                        </li>
                        <li>
                          <div className="avatar-label avatar-light avatar-circle">
                            +4K
                          </div>
                        </li>
                      </ul>
                      <div className="ms-3">
                        <h4 className="mb-0 ">15k+</h4>
                        <span>Happy Clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0 pb-0 flex-wrap">
                  <div className="blance-media">
                    <h5 className="mb-0">Sales Revenues</h5>
                    <h4 className="mb-0">
                      $25,217k{" "}
                      <span className="badge badge-sm badge-success light">
                        +2.7%
                      </span>
                    </h4>
                  </div>
                  <ul
                    className="nav nav-pills mix-chart-tab"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        data-series="week"
                        id="pills-week-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-week"
                        type="button"
                        role="tab"
                        aria-selected="true"
                      >
                        Week
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-series="month"
                        id="pills-month-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-month"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        Month
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-series="year"
                        id="pills-year-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-year"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        Year
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-series="all"
                        id="pills-all-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-all"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        All
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div id="chartBarRunning" className="pt-0" />
                  <div className="ttl-project">
                    <div className="pr-data">
                      <h5>12,721</h5>
                      <span>Number of Projects</span>
                    </div>
                    <div className="pr-data">
                      <h5 className="text-primary">721</h5>
                      <span>Active Projects</span>
                    </div>
                    <div className="pr-data">
                      <h5>$2,50,523</h5>
                      <span>Revenue</span>
                    </div>
                    <div className="pr-data">
                      <h5 className="text-success">12,275h</h5>
                      <span>Working Hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="card">
                <div className="card-header border-dashed border-top-0 border-end-0 border-start-0 flex-wrap">
                  <h5 className="mb-0">Best Selling Products</h5>
                  <div className="d-flex align-items-center justify-content-between transaction">
                    <a href="javascript:void(0);" className="btn">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.66699 4.66699H13.3337"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.66699 8L9.33366 8"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.66699 11.333H4.00033"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Sort By
                    </a>
                    <a href="javascript:void(0);" className="btn">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.1594 3.33301H4.84121C3.98686 3.33301 3.52595 4.33513 4.08196 4.9838L6.42625 7.71881C6.5816 7.90005 6.66699 8.13089 6.66699 8.3696V11.3816C6.66699 11.7604 6.881 12.1067 7.21978 12.2761L7.88645 12.6094C8.55135 12.9419 9.33366 12.4584 9.33366 11.715V8.3696C9.33366 8.13089 9.41905 7.90005 9.5744 7.71881L11.9187 4.9838C12.4747 4.33513 12.0138 3.33301 11.1594 3.33301Z"
                          stroke="#1C2430"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Filter
                    </a>
                  </div>
                </div>
                <div className="card-body overflow-hidden">
                  <div className="best-selling-slider">
                    <div className="swiper mySwiper1 swiper-lr">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt2.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt1.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt3.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt4.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="card">
                            <div className="card-body product">
                              <img src="images/swiper/shirt1.jpg" alt="img" />
                              <div className="product-imfo">
                                <div className="d-flex justify-content-between">
                                  <span className="text-danger">
                                    up to 79% off
                                  </span>
                                  <h6 className="font-w600">$80</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <h6 className="font-w600">
                                    Block Tiered Dress.
                                  </h6>
                                  <span>
                                    <del>$95</del>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
