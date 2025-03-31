import { Link } from "react-router-dom";

const CategoryList = () => {
  return (
    <section className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mr-auto">
            <div className="section-title">
              <h2 className="title">Categories</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div
              className="owl-carousel no-pb slide-arrow-2"
              data-dots="false"
              data-nav="false"
              data-items={4}
              data-lg-items={3}
              data-md-items={2}
              data-sm-items={2}
              data-margin={30}
              data-autoplay="false"
            >
              <Link to="/products?category=1" className="item">
                <div className="product-item">
                  <div className="product-img">
                    <img
                      className="img-fluid"
                      src="images/product/01.jpg"
                      alt=""
                    />
                  </div>
                  <div className="product-desc !tw-block !tw-py-3 !tw-translate-y-full">
                    {" "}
                    <p className="product-name tw-m-0 tw-text-center">
                      Danh mục 1
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
