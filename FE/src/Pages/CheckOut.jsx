import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const CheckOut = () => {
  return (
    <div>
      <Header />

      {/*page title start*/}
      <div>
        <section className="page-title o-hidden" img="images/bg/02.jpg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12">
                <h1 className="mb-3">
                  Checkout <span className="text-theme">Process</span>
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
                      Checkout
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
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="checkout-form box-shadow white-bg px-5 py-5 md-px-3 md-py-3 xs-px-2 xs-py-2">
                    <h3 className="mb-4">
                      Billing <span className="text-theme">Details</span>
                    </h3>
                    <form className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            id="fname"
                            className="form-control"
                            placeholder="Your firstname"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            id="lname"
                            className="form-control"
                            placeholder="Your lastname"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>E-mail Address</label>
                          <input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="State Province"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            id="phone"
                            className="form-control"
                            placeholder
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            type="text"
                            id="companyname"
                            className="form-control"
                            placeholder="Company Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Select Country</label>
                          <div className="form-field">
                            <i className="icon icon-arrow-down3" />
                            <select
                              name="people"
                              id="people"
                              className="form-control"
                            >
                              <option value="#">Select country</option>
                              <option value="#">Alaska</option>
                              <option value="#">China</option>
                              <option value="#">Japan</option>
                              <option value="#">Korea</option>
                              <option value="#">Philippines</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            id="address"
                            className="form-control"
                            placeholder="Enter Your Address"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            id="address2"
                            className="form-control"
                            placeholder="Second Address"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Town/City</label>
                          <input
                            type="text"
                            id="towncity"
                            className="form-control"
                            placeholder="Town or City"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-0">
                          <label>State/Province</label>
                          <input
                            type="text"
                            id="statename"
                            className="form-control"
                            placeholder="State Province"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-0">
                          <label>Zip/Postal Code</label>
                          <input
                            type="text"
                            id="zippostalcode"
                            className="form-control"
                            placeholder="Zip / Postal"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 md-mt-5">
                  <div className="cart-detail px-5 py-5 md-px-3 md-py-3 xs-px-2 xs-py-2 dark-bg mb-5 text-white">
                    <h3 className="mb-3">
                      Cart <span className="text-theme">Total</span>
                    </h3>
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <span> 1 x Product Name </span> $ 2404.00
                      </li>
                      <li className="mb-3">
                        <span> 1 x Product Name </span> $ 498.00
                      </li>
                      <li className="mb-3">
                        <span> Shipping </span> $ 0.00
                      </li>
                      <li className="mb-3">
                        <span> Subtotal </span> $ 2830.00
                      </li>
                      <li>
                        <span>
                          <strong className="cart-total"> Total :</strong>
                        </span>{" "}
                        <strong className="cart-total">$ 2830.00 </strong>
                      </li>
                    </ul>
                  </div>
                  <div className="cart-detail px-5 py-5 md-px-3 md-py-3 xs-px-2 xs-py-2 grey-bg">
                    <h3 className="mb-3">
                      Payment <span className="text-theme">Method</span>
                    </h3>
                    <div className="form-group">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="customRadio1"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio1"
                        >
                          Direct Bank Tranfer
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="customRadio2"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio2"
                        >
                          Check Payment
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="customRadio3"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio3"
                        >
                          Paypal Account
                        </label>
                      </div>
                    </div>
                    <div className="form-group mb-0">
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
                          I have read and accept the terms and conditions
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-theme btn-block">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/*product end*/}
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
                          defaultValue
                          name="EMAIL"
                          className="email box-shadow"
                          id="mc-email"
                          placeholder="Email Address"
                          required
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
      </div>

      <Footer />
    </div>
  );
};

export default CheckOut;
