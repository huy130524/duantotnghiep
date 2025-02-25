import React from "react";
import Banner from "./Banner";

const Main = () => {
  return (
    <div>
      <Banner />

      <section>
        <div className="container">
          <div className="row row-eq-height">
            <div className="col-lg-6">
              <div className="product-add">
                <img className="h-100" src="images/product-add/01.jpg" alt />
                <div className="product-add-hover">
                  <h4 className="large-font">
                    The Half Price <br />
                    Summer Sale
                  </h4>
                  <a className="btn btn-theme btn-iconic mt-2" href="#">
                    <span>
                      Shop Now <i className="fas fa-shopping-cart" />
                    </span>
                  </a>
                </div>
                <div className="add-sale-label">Sale</div>
              </div>
            </div>
            <div className="col-lg-6 md-mt-3">
              <div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="product-add">
                      <img src="images/product-add/02.jpg" alt />
                      <div className="product-add-hover">
                        <h4>
                          Best Summer <br />
                          Collection
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 xs-mt-3">
                    <div className="product-add">
                      <img src="images/product-add/03.jpg" alt />
                      <div className="product-add-hover">
                        <h4>
                          Trending item <br />
                          Collection 2018
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="product-add">
                      <img src="images/product-add/04.jpg" alt />
                      <div className="product-add-hover">
                        <h4 className="large-font-2 text-black">
                          New Style Arrival <br />
                          For Kids
                        </h4>
                        <a className="btn btn-theme btn-iconic" href="#">
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
        </div>
      </section>
    </div>
  );
};

export default Main;
