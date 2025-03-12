const HomePage = () => {
  return (
    <>
      <div className="page-content">
        {/*product add start*/}
        <section>
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-lg-6">
                <div className="product-add">
                  <img
                    className="h-100"
                    src="images/product-add/01.jpg"
                    alt=""
                  />
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
                        <img src="images/product-add/02.jpg" alt="" />
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
                        <img src="images/product-add/03.jpg" alt="" />
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
                        <img src="images/product-add/04.jpg" alt="" />
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
        {/*product add end*/}
        {/*product start*/}
        <section className="pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mr-auto">
                <div className="section-title">
                  <h2 className="title">
                    Featured <span>Products</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className="owl-carousel no-pb slide-arrow-2"
                  data-dots="false"
                  data-nav="true"
                  data-items={4}
                  data-lg-items={3}
                  data-md-items={2}
                  data-sm-items={2}
                  data-margin={30}
                  data-autoplay="true"
                >
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/01.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Jacket
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item product-label-new">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/02.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Shirt
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/03.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Curvas Cap
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item product-label-sale">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/04.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Gown
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/05.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Goggles
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*product end*/}
        {/*hot deal start*/}
        <section className="grey-bg text-center custom-pb-18">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title mb-0">
                  <h2 className="title mb-3">
                    Hot Deal Of <span> the week</span>
                  </h2>
                  <h4 className="text-capitalize mb-0">
                    Hurry Up Offer ends in:
                  </h4>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                    <ul
                      className="countdown shop-count list-inline"
                      data-countdown="2020/09/23"
                    />
                  </div>
                </div>
                <a className="btn btn-white" href="#">
                  <span>Shop Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*hot deal end*/}
        {/*product start*/}
        <section className="custom-mt-10 pt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="owl-carousel"
                  data-items={4}
                  data-lg-items={3}
                  data-md-items={2}
                  data-sm-items={2}
                  data-margin={30}
                  data-autoplay="true"
                >
                  <div className="item">
                    <div className="product-item mb-0">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/01.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Jacket
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item mb-0">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/02.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Shirt
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item mb-0">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/03.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Curvas Cap
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item mb-0">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/04.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Gown
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item mb-0">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/05.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Goggles
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*product end*/}
        {/*add start*/}
        <section
          className="dark-bg text-white grediant-overlay"
          data-bg-img="images/bg/03.jpg"
          data-overlay={5}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 ml-auto">
                <h2 className="large-font text-white">
                  2020 <br /> Best Summer Collection
                </h2>
                <a className="btn btn-theme btn-iconic animated5" href="#">
                  <span>
                    Shop Now <i className="fas fa-shopping-cart" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*add end*/}
        {/*masonry start*/}
        <section>
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-8 col-md-12 ml-auto mr-auto">
                <div className="section-title">
                  <h2 className="title">
                    New <span>Arrivals</span>
                  </h2>
                </div>
                <div className="portfolio-filter">
                  <button data-filter="" className="is-checked">
                    All
                  </button>
                  <button data-filter=".cat1">Women's</button>
                  <button data-filter=".cat2">Men's</button>
                  <button data-filter=".cat3">Kids</button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="grid row columns-3">
                  <div className="grid-item cat1">
                    <div className="product-item product-label-new">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/05.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Goggles
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid-item cat2">
                    <div className="product-item product-label-new">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/08.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Shirts
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid-item cat3">
                    <div className="product-item product-label-new">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/06.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Jacket
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid-item cat2">
                    <div className="product-item product-label-new">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/09.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Tshirt
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid-item cat1">
                    <div className="product-item product-label-new">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/07.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Jeans
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid-item cat3">
                    <div className="product-item product-label-new">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/10.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          kids frock
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*masonry end*/}
        {/*testimonial start*/}
        <section className="grey-bg text-center testimonial">
          <div className="container">
            <div className="row text-center">
              <div className="col-xl-8 col-lg-10 col-md-12 ml-auto mr-auto">
                <div className="tab">
                  {/* Tab panes */}
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      role="tabpanel"
                      className="tab-pane fade show active"
                      id="tab1-1"
                    >
                      <div className="testimonial-content">
                        {" "}
                        <i className="fas fa-quote-left" />
                        <p>
                          Quae adipisci quam laudantium nulla modi, Consectetur
                          adipisicing elit, Totam mollitia incidunt vero
                          cupiditate obcaecati iusto tempora unde! Numquam
                          officiis, adipisci quam laudantium nulla modi.
                        </p>
                      </div>
                      <div className="testimonial-caption">
                        <h6>Kelly Rain</h6>
                        <label>- Manager</label>
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab1-2">
                      <div className="testimonial-content">
                        {" "}
                        <i className="fas fa-quote-left" />
                        <p>
                          Aaudantium Quae adipisci quam nulla modi, Consectetur
                          adipisicing elit, Totam mollitia incidunt vero
                          cupiditate obcaecati iusto tempora unde! Numquam
                          officiis, adipisci quam laudantium nulla modi.
                        </p>
                      </div>
                      <div className="testimonial-caption">
                        <h6>John Doe</h6>
                        <label>- Manager</label>
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab1-3">
                      <div className="testimonial-content">
                        {" "}
                        <i className="fas fa-quote-left" />
                        <p>
                          Numquam adipisci quam laudantium nulla modi,
                          Consectetur adipisicing elit, Totam mollitia incidunt
                          vero cupiditate obcaecati iusto tempora unde!
                          officiis, adipisci quam laudantium nulla modi.
                        </p>
                      </div>
                      <div className="testimonial-caption">
                        <h6>Jamy Lynn</h6>
                        <label>- Advisor</label>
                      </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="tab1-4">
                      <div className="testimonial-content">
                        {" "}
                        <i className="fas fa-quote-left" />
                        <p>
                          Consectetur buae adipisci quam laudantium nulla modi,
                          adipisicing elit, Totam mollitia incidunt vero
                          cupiditate obcaecati iusto tempora unde! Numquam
                          officiis, adipisci quam laudantium nulla modi.
                        </p>
                      </div>
                      <div className="testimonial-caption">
                        <h6>John Methew</h6>
                        <label>- Manager</label>
                      </div>
                    </div>
                  </div>
                  {/* Nav tabs */}
                  <nav>
                    <div
                      className="nav nav-tabs mt-5"
                      id="nav-tab"
                      role="tablist"
                    >
                      <a
                        className="nav-item nav-link active"
                        id="nav-tab1"
                        data-toggle="tab"
                        href="#tab1-1"
                        role="tab"
                        aria-selected="true"
                      >
                        <img
                          className="img-center"
                          src="images/thumbnail/01.png"
                          alt=""
                        />
                      </a>
                      <a
                        className="nav-item nav-link"
                        id="nav-tab2"
                        data-toggle="tab"
                        href="#tab1-2"
                        role="tab"
                        aria-selected="false"
                      >
                        <img
                          className="img-center"
                          src="images/thumbnail/02.png"
                          alt=""
                        />
                      </a>
                      <a
                        className="nav-item nav-link"
                        id="nav-tab3"
                        data-toggle="tab"
                        href="#tab1-3"
                        role="tab"
                        aria-selected="false"
                      >
                        <img
                          className="img-center"
                          src="images/thumbnail/01.png"
                          alt=""
                        />
                      </a>
                      <a
                        className="nav-item nav-link"
                        id="nav-tab4"
                        data-toggle="tab"
                        href="#tab1-4"
                        role="tab"
                        aria-selected="false"
                      >
                        <img
                          className="img-center"
                          src="images/thumbnail/02.png"
                          alt=""
                        />
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*testimonial end*/}
        {/*top product start*/}
        <section className="product-left-side">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <h4 className="mb-4 title">
                  Top <span>Rated</span>
                </h4>
                <div className="product product-left mb-4">
                  <div className="product-image">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src="images/product/01.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="product-desc">
                    <div className="product-title">
                      <h5>
                        {" "}
                        <a href="#"> Jacket </a>{" "}
                      </h5>
                    </div>
                    <div className="product-price">
                      <span>
                        {" "}
                        $179.99 <del>$279.00</del>
                      </span>
                      <span className="review-rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product product-left">
                  <div className="product-image">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src="images/product/02.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="product-desc">
                    <div className="product-title">
                      <h5>
                        {" "}
                        <a href="#">Shirt </a>{" "}
                      </h5>
                    </div>
                    <div className="product-price">
                      <span>
                        {" "}
                        $179.99 <del>$279.00</del>
                      </span>
                      <span className="review-rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 md-mt-3 sm-mt-5">
                <h4 className="mb-4 title">
                  Most <span>Popular</span>
                </h4>
                <div className="product product-left mb-4">
                  <div className="product-image">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src="images/product/03.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="product-desc">
                    <div className="product-title">
                      <h5>
                        {" "}
                        <a href="#">Curvas cap</a>{" "}
                      </h5>
                    </div>
                    <div className="product-price">
                      <span>
                        {" "}
                        $179.99 <del>$279.00</del>
                      </span>
                      <span className="review-rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product product-left">
                  <div className="product-image">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src="images/product/04.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="product-desc">
                    <div className="product-title">
                      <h5>
                        {" "}
                        <a href="#">Gown</a>{" "}
                      </h5>
                    </div>
                    <div className="product-price">
                      <span>
                        {" "}
                        $179.99 <del>$279.00</del>
                      </span>
                      <span className="review-rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 md-mt-3 sm-mt-5">
                <h4 className="mb-4 title">
                  Top On <span>Sale</span>
                </h4>
                <div className="product product-left mb-4">
                  <div className="product-image">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src="images/product/05.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="product-desc">
                    <div className="product-title">
                      <h5>
                        {" "}
                        <a href="#">Goggles</a>{" "}
                      </h5>
                    </div>
                    <div className="product-price">
                      <span>
                        {" "}
                        $179.99 <del>$279.00</del>
                      </span>
                      <span className="review-rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product product-left">
                  <div className="product-image">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src="images/product/07.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="product-desc">
                    <div className="product-title">
                      <h5>
                        {" "}
                        <a href="#">Jeans</a>{" "}
                      </h5>
                    </div>
                    <div className="product-price">
                      <span>
                        {" "}
                        $179.99 <del>$279.00</del>
                      </span>
                      <span className="review-rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*top product end*/}
        {/*product add start*/}
        <section className="o-hidden p-0 text-center">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="product-add">
                  <img src="images/product-add/05.jpg" alt="" />
                  <div className="product-add-hover center px-3">
                    <h2 className="text-white large-font">
                      New Women's <br /> Collection 2018
                    </h2>
                    <a className="btn btn-theme btn-iconic mt-2" href="#">
                      <span>
                        Shop Now <i className="fas fa-shopping-cart" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-add">
                  <img src="images/product-add/07.jpg" alt="" />
                  <div className="product-add-hover center px-3">
                    <h2 className="text-white large-font">
                      New Men's <br /> Collection 2018
                    </h2>
                    <a className="btn btn-theme btn-iconic mt-2" href="#">
                      <span>
                        Shop Now <i className="fas fa-shopping-cart" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*product add end*/}
        {/*best seller start*/}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mr-auto">
                <div className="section-title">
                  <h2 className="title">
                    Best <span>Seller</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className="owl-carousel no-pb slide-arrow-2"
                  data-dots="false"
                  data-nav="true"
                  data-items={3}
                  data-md-items={2}
                  data-sm-items={2}
                  data-margin={30}
                  data-autoplay="true"
                >
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/01.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Jacket
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/02.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Men's Shirt
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/03.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Curvas Cap
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/04.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Gown
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="product-item">
                      <div className="product-img">
                        <img
                          className="img-fluid"
                          src="images/product/05.jpg"
                          alt=""
                        />
                        <div className="product-overlay">
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-heart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="far fa-eye" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                {" "}
                                <i className="fas fa-signal" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-desc">
                        {" "}
                        <a href="product-detail.html" className="product-name">
                          Goggles
                        </a>
                        <span className="product-price">$22.00</span>
                      </div>
                      <div className="product-btn">
                        <button className="btn btn-theme btn-block">
                          <span>Add to Cart</span>{" "}
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*best seller end*/}
        {/*blog start*/}
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
        {/*blog end*/}
        {/*feuture start*/}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <div className="featured-item">
                  <div className="featured-icon">
                    {" "}
                    <i className="flaticon-shipped" />
                  </div>
                  <div className="featured-title text-uppercase">
                    <h5>cach on delivery</h5>
                  </div>
                  <div className="featured-desc">
                    <p>
                      Maximus vestibulum Nam pulvinar vitae neque et porttitor
                      Praesent sed nisi eleifend.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 md-mt-5">
                <div className="featured-item">
                  <div className="featured-icon">
                    {" "}
                    <i className="flaticon-free-delivery" />
                  </div>
                  <div className="featured-title text-uppercase">
                    <h5>free shipping</h5>
                  </div>
                  <div className="featured-desc">
                    <p>
                      Maximus vestibulum Nam pulvinar vitae neque et porttitor
                      Praesent sed nisi eleifend.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 md-mt-5">
                <div className="featured-item">
                  <div className="featured-icon">
                    {" "}
                    <i className="flaticon-refresh-left-arrow" />
                  </div>
                  <div className="featured-title text-uppercase">
                    <h5>35 days return</h5>
                  </div>
                  <div className="featured-desc">
                    <p>
                      Maximus vestibulum Nam pulvinar vitae neque et porttitor
                      Praesent sed nisi eleifend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*feuture end*/}
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
                        defaultValue=""
                        name="EMAIL"
                        className="email box-shadow"
                        id="mc-email"
                        placeholder="Email Address"
                        required=""
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
      {/*body content end*/}
    </>
  );
};

export default HomePage;
