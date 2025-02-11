import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Login = () => {
  return (
    <div>
      <Header />
      <div>
        <section className="page-title o-hidden" data-bg-img="images/bg/02.jpg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                <h1 className="mb-3">
                  Login <span className="text-theme">Now</span>
                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-4 justify-content-end">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="fas fa-home" />
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Pages</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Login
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
          {/*login start*/}
          <section className="login">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-10 ml-auto mr-auto">
                  <div className="login-form text-center box-shadow white-bg pt-5">
                    <h2 className="title mb-4">
                      Lo<span>gin</span>
                    </h2>
                    <form
                      id="contact-form"
                      className="px-5"
                      method="post"
                      action="https://themeht.com/template/oveltyshop/html/ltr/php/contact.php"
                    >
                      <div className="messages" />
                      <div className="form-group">
                        {" "}
                        <i className="far fa-user" />
                        <input
                          id="form_name"
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="User name"
                          required="required"
                          data-error="Username is required."
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="form-group">
                        {" "}
                        <i className="fas fa-unlock-alt" />
                        <input
                          id="form_password"
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          required="required"
                          data-error="password is required."
                        />
                        <div className="help-block with-errors" />
                      </div>
                      <div className="form-group mt-4 mb-5">
                        <div className="remember-checkbox clearfix">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              Remember me
                            </label>
                          </div>
                          <a href="#" className="float-right">
                            Forgot Password?
                          </a>
                        </div>
                      </div>{" "}
                      <a href="#" className="btn btn-theme btn-block">
                        <span>Login Now</span>
                      </a>
                      <h5 className="mb-0 mt-3 text-capitalize">
                        Don't Have An Account ?{" "}
                        <a href="#">
                          <i>Sign Up!</i>
                        </a>
                      </h5>
                    </form>
                    <div className="login-social mt-5 text-center clearfix">
                      <ul className="list-inline d-flex flex-lg-row flex-column justify-content-between align-items-between">
                        <li>
                          <a className="fb" href="#">
                            <i className="fab fa-facebook-f mr-1" />
                          </a>
                        </li>
                        <li>
                          <a className="twitter" href="#">
                            <i className="fab fa-twitter mr-1" />
                          </a>
                        </li>
                        <li>
                          <a className="gplus" href="#">
                            <i className="fab fa-google-plus-g mr-1" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
