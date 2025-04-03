import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Dropdown, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api";
import { useProfile } from "../../hooks/useProfile";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const ClientHeader = () => {
  const [keyword, setKeyword] = useState("");

  const location = useLocation();

  const { profile } = useProfile();
  const { isLogged, logout } = useAuth();

  useEffect(() => {
    if (location.pathname !== "/products") {
      setKeyword("");
    }
  }, [location.pathname]);

  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationKey: ["LOGOUT"],
    mutationFn: () => api.post("/logout"),
    onSuccess: logout,
  });

  const onLogout = () => {
    logoutMutation.mutate();
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const onSearch = () => {
    if (!keyword) {
      navigate("/products");
      return;
    }

    navigate({
      pathname: "/products",
      search: `?search=${keyword}`,
    });
  };

  return (
    <>
      <header id="site-header" className="header">
        <div className="top-bar">
          <div className="container">
            <div className="row align-items-center sm-text-center">
              <div className="col-lg-6 col-md-4">
                <div className="topbar-link">
                  <Input
                    placeholder="Enter product name"
                    suffix={<SearchOutlined />}
                    value={keyword}
                    onChange={onSearchChange}
                    onPressEnter={onSearch}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-8 text-md-right">
                <div className="topbar-right">
                  <ul className="topbar-menu">
                    {isLogged ? (
                      <li>
                        <Dropdown
                          menu={{
                            items: [
                              {
                                label: "Đăng xuất",
                                onClick: onLogout,
                              },
                            ],
                          }}
                          arrow
                        >
                          <Link to="/profile">
                            Xin chào, {profile?.fullname}
                          </Link>
                        </Dropdown>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/login">Sign In</Link>
                        </li>
                        <li>
                          <Link to="/register">Register</Link>
                        </li>
                      </>
                    )}
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
                  <Link to="/" className="navbar-brand logo">
                    <img
                      id="logo-img"
                      className="img-center"
                      src="images/logo.png"
                      alt=""
                    />
                  </Link>
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
                      <NavLink to="/" className="nav-item">
                        <p className="nav-link tw-m-0">
                          <span className="menu-label">Home</span>
                        </p>
                      </NavLink>

                      <NavLink to="/products" className="nav-item">
                        <p className="nav-link tw-m-0">
                          <span className="menu-label">Products</span>
                        </p>
                      </NavLink>

                      <NavLink to="/contact" className="nav-item">
                        <p className="nav-link tw-m-0">
                          <span className="menu-label">Contact</span>
                        </p>
                      </NavLink>
                    </ul>
                  </div>
                  <ul className="right-nav justify-content-end list-inline">
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
