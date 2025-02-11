import React from "react";

const Header = () => {
  return (
    <div>
      <div>
        {/* meta tags */}
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="Ecommerce, Shop, Fashion, Furniture, Electronic, Multipurpose"
        />
        <meta
          name="description"
          content="Ecommerce Responsive HTML5 Template"
        />
        <meta name="author" content="www.themeht.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Title */}
        <title>Oveltyshop - Ecommerce Responsive HTML5 Template</title>
        {/* favicon icon */}
        <link rel="shortcut icon" href="images/favicon.ico" />
        {/* inject css start */}
        {/*== bootstrap */}
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        {/*== animate */}
        <link href="css/animate.css" rel="stylesheet" type="text/css" />
        {/*== fontawesome */}
        <link href="css/fontawesome-all.css" rel="stylesheet" type="text/css" />
        {/*== themify-icons */}
        <link href="css/themify-icons.css" rel="stylesheet" type="text/css" />
        {/*== magnific-popup */}
        <link
          href="css/magnific-popup/magnific-popup.css"
          rel="stylesheet"
          type="text/css"
        />
        {/*== jquery-ui */}
        <link href="css/jquery-ui.css" rel="stylesheet" type="text/css" />
        {/*== owl-carousel */}
        <link
          href="css/owl-carousel/owl.carousel.css"
          rel="stylesheet"
          type="text/css"
        />
        {/*== slit-slider */}
        <link
          href="css/slit-slider/slit-slider.css"
          rel="stylesheet"
          type="text/css"
        />
        {/*== slick-slider */}
        <link
          href="css/slick-slider/slick.css"
          rel="stylesheet"
          type="text/css"
        />
        {/*== nice-select */}
        <link href="css/nice-select.css" rel="stylesheet" type="text/css" />
        {/*== base */}
        <link href="css/base.css" rel="stylesheet" type="text/css" />
        {/*== style */}
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        {/*== responsive */}
        <link href="css/responsive.css" rel="stylesheet" type="text/css" />
        {/*== color-customizer */}
        <link href="#" data-style="styles" rel="stylesheet" />
        <link
          href="css/color-customize/color-customizer.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* inject css end */}
      </div>

      <header id="site-header" className="header">
        <div className="top-bar">
          <div className="container">
            <div className="row align-items-center sm-text-center">
              <div className="col-lg-6 col-md-4">
                <div className="topbar-link">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <span>Email</span>
                      <a href="mailto:themeht23@gmail.com">
                        themeht23@gmail.com
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <span>Call Us</span>
                      <a href="tel:+912345678900">+91-234-567-8900</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-8 text-md-right">
                <div className="topbar-right">
                  <ul className="topbar-menu">
                    {/* Currency / Language / My Account */}
                    <li className="currency">
                      <div className="currency-selection">
                        <select>
                          <option value={1}>Usd</option>
                          <option value={2}>cad</option>
                          <option value={3}>aud</option>
                          <option value={4}>eur</option>
                        </select>
                      </div>
                    </li>
                    <li className="language">
                      <div className="language-selection">
                        <select>
                          <option value={1}>English</option>
                          <option value={2}>French</option>
                          <option value={3}>Italian</option>
                          <option value={4}>German</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <a href="login.html">Sign In</a>
                    </li>
                    <li>
                      <a href="register.html">Register</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="header-wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav className="navbar navbar-expand-lg">
                  <a className="navbar-brand logo" href="index.html">
                    <img
                      id="logo-img"
                      className="img-center"
                      src="images/logo.png"
                      alt="Logo"
                    />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span />
                    <span />
                    <span />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                  >
                    {/* Left nav */}
                    <ul className="nav navbar-nav ml-auto mr-auto">
                      <li className="nav-item active dropdown">
                        {" "}
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                        >
                          <span className="menu-label">Home</span>
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                        >
                          {" "}
                          <span className="menu-label">Pages</span>
                        </a>
                      </li>
                      <li className="nav-item dropdown position-static">
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                        >
                          {" "}
                          <span className="menu-label">Categories</span>
                        </a>
                        <ul className="dropdown-menu w-100">
                          <li className="container">
                            <div className="row w-100 my-3">
                              <div className="col-md-4">
                                <ul className="list-unstyled">
                                  <li className="menu-title">
                                    Women's Collection
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Dresses
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Blouses
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      T-shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Bras &amp; Panties
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              {/* /.col-md-4  */}
                              <div className="col-md-4">
                                <ul className="list-unstyled">
                                  <li className="menu-title">
                                    Men's Collection
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      T-Shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Jeans
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Trench
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              {/* /.col-md-4  */}
                              <div className="col-md-4">
                                <ul className="list-unstyled">
                                  <li className="menu-title">
                                    Kids's Collection
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Dresses
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      T-shirts
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Jackets
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="product.html"
                                    >
                                      Jeans
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          {/*  /.container  */}
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        {" "}
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                        >
                          <span className="menu-label">Shop</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li className="dropdown dropdown-submenu">
                            {" "}
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#"
                            >
                              Product
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-left-sidebar.html"
                                >
                                  Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-right-sidebar.html"
                                >
                                  Right Sidebar
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product.html"
                                >
                                  Fullwidth
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown dropdown-submenu">
                            {" "}
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#"
                            >
                              Product Grid
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-grid-2.html"
                                >
                                  Grid 2
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-grid-3.html"
                                >
                                  Grid 3
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-grid-left-sidebar.html"
                                >
                                  Grid Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-grid-right-sidebar.html"
                                >
                                  Grid Right Sidebar
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown dropdown-submenu">
                            {" "}
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#"
                            >
                              Product Single
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-details.html"
                                >
                                  Product Single 1
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="product-details-2.html"
                                >
                                  Product Single 2
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            {" "}
                            <a
                              className="dropdown-item"
                              href="product-cart.html"
                            >
                              Product Cart
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        {" "}
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                        >
                          <span className="menu-label">Blog</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="blog.html">
                              Blog
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="blog-masonry.html"
                            >
                              Blog masonry
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="blog-single.html"
                            >
                              Blog Single
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        {" "}
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                        >
                          <span className="menu-label">Contact Us</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <ul className="right-nav justify-content-end list-inline">
                    <li className="list-inline-item search-icon mr-4">
                      <div className="search-wrap">
                        <button id="btn-search" className="btn-search">
                          <i className="flaticon-search-1" />
                        </button>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="cart">
                        {" "}
                        <a href="#" id="header-cart-btn">
                          <span className="cart-badge">2</span>{" "}
                          <i className="ti-bag" />
                        </a>
                        {/* Cart List Area Start */}
                        <ul className="cart-list">
                          <li>
                            <a href="#" className="image">
                              <img
                                src="images/product-thumb/01.jpg"
                                className="img-fluid cart-thumb"
                                alt
                              />
                            </a>
                            <div className="cart-item-desc">
                              <h6>
                                <a href="#">Women's Fashion</a>
                              </h6>
                              <p>
                                1x - <span className="price">$35</span>
                              </p>
                            </div>
                          </li>
                          <li>
                            <a href="#" className="image">
                              <img
                                src="images/product-thumb/02.jpg"
                                className="img-fluid cart-thumb"
                                alt
                              />
                            </a>
                            <div className="cart-item-desc">
                              <h6>
                                <a href="#">Women's Fashion</a>
                              </h6>
                              <p>
                                1x - <span className="price">$75</span>
                              </p>
                            </div>
                          </li>
                          <li className="total text-right">
                            {" "}
                            <span className="d-block">Total: $110.00</span>
                          </li>
                          <li>
                            <a
                              href="product-cart.html"
                              className="btn btn-theme btn-sm"
                            >
                              Cart
                            </a>
                            <a
                              href="checkout.html"
                              className="btn btn-border btn-sm"
                            >
                              Checkout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
