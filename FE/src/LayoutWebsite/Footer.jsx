import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer dark-bg">
        <div className="primary-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 footer-list">
                <h5>Information</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="product.html">Top Sellers</a>
                  </li>
                  <li>
                    <a href="product.html">New Product</a>
                  </li>
                  <li>
                    <a href="#">Delivery information</a>
                  </li>
                  <li>
                    <a href="terms-and-conditions.html">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#">Special</a>
                  </li>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 xs-mt-5 footer-list">
                <h5>Customer Service</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="order-tracking.html">Order Tracking</a>
                  </li>
                  <li>
                    <a href="contact-1.html">Help &amp; Contact</a>
                  </li>
                  <li>
                    <a href="product.html">Career</a>
                  </li>
                  <li>
                    <a href="return-policy.html">Returns Policy</a>
                  </li>
                  <li>
                    <a href="#">Product Support</a>
                  </li>
                  <li>
                    <a href="#">Legal Notice</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 md-mt-5 footer-list">
                <h5>My Account</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">My Account</a>
                  </li>
                  <li>
                    <a href="#">Personal Information</a>
                  </li>
                  <li>
                    <a href="#">Order History</a>
                  </li>
                  <li>
                    <a href="#">Address</a>
                  </li>
                  <li>
                    <a href="product-wishlist.html">Wish List</a>
                  </li>
                  <li>
                    <a href="#">Newsletter</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 md-mt-5">
                <h5>Get In Touch</h5>
                <ul className="media-icon list-unstyled">
                  <li className="mb-4">
                    <p className="mb-0">423B, Road Wordwide Country, USA</p>
                  </li>
                  <li className="mb-4">
                    <a href="mailto:themeht23@gmail.com">themeht23@gmail.com</a>
                  </li>
                  <li className="mb-4">
                    <a href="tel:+912345678900">+91-234-567-8900</a>
                  </li>
                  <li>
                    <p className="mb-0">Working Hours: 9:00am - 8:00pm</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row client-logo mt-10">
              <div className="col-md-12">
                <div
                  className="owl-carousel no-pb"
                  data-dots="false"
                  data-items={5}
                  data-md-items={4}
                  data-sm-items={3}
                  data-margin={30}
                  data-autoplay="true"
                >
                  <div className="item">
                    <img
                      className="img-center"
                      src="images/client/01.png"
                      alt
                    />
                  </div>
                  <div className="item">
                    <img
                      className="img-center"
                      src="images/client/01.png"
                      alt
                    />
                  </div>
                  <div className="item">
                    <img
                      className="img-center"
                      src="images/client/01.png"
                      alt
                    />
                  </div>
                  <div className="item">
                    <img
                      className="img-center"
                      src="images/client/01.png"
                      alt
                    />
                  </div>
                  <div className="item">
                    <img
                      className="img-center"
                      src="images/client/01.png"
                      alt
                    />
                  </div>
                  <div className="item">
                    <img
                      className="img-center"
                      src="images/client/01.png"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="secondary-footer text-center">
          <div className="container">
            <div className="copyright">
              <div className="row">
                <div className="col-md-12">
                  {" "}
                  <span className="text-white">
                    Copyright 2018 Oveltyshop Theme by{" "}
                    <a target="_blank" href="www.themeht.html">
                      {" "}
                      ThemeHt{" "}
                    </a>{" "}
                    | All Rights Reserved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
