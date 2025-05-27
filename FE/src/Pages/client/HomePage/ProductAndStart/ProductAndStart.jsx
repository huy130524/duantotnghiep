const ProductAndStart = () => {
  return (
    <section className="o-hidden p-0 text-center">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-md-6">
            <div className="product-add">
              <img src="images/product-add/05.jpg" alt="" />
              <div className="product-add-hover center px-3">
                <h2 className="text-white large-font">
                  New Women's <br /> Collection 2025 
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
                  New Men's <br /> Collection 2025 
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
  );
};

export default ProductAndStart;
