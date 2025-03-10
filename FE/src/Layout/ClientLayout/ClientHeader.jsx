import { Link } from "react-router-dom";

const ClientHeader = () => {
  return (
    <>
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
                      <Link to="/login">Sign In</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
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
                      alt=""
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
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="index.html">
                              Home 1
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="index-2.html">
                              Home 2
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="index-3.html">
                              Home 3
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="index-4.html">
                              Home 4
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="index-sidemenu.html"
                            >
                              Home 5
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="index-furniture.html"
                            >
                              Home 6
                            </a>
                          </li>
                        </ul>
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
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="product-wishlist.html"
                            >
                              Wishlist
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="checkout.html">
                              Checkout
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="order-complete.html"
                            >
                              Order Complete
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="login.html">
                              Login
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="register.html">
                              Register
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="error-404.html">
                              404
                            </a>
                          </li>
                        </ul>
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
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="contact-1.html">
                              Contact 1
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="contact-2.html">
                              Contact 2
                            </a>
                          </li>
                        </ul>
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
                                alt=""
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
                                alt=""
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
      <div className="search">
        <button
          id="btn-search-close"
          className="btn-search-close"
          aria-label="Close search form"
        >
          <i className="flaticon-cancel" />
        </button>
        <form className="search-form">
          <input
            className="search-input"
            name="search"
            type="search"
            placeholder="drones"
          />{" "}
          <span className="search-info">
            Hit enter to search or ESC to close
          </span>
        </form>
      </div>
    </>
  );
};

export default ClientHeader;
