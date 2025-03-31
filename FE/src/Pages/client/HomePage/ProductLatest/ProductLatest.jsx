import { Link } from "react-router-dom";
import { getImageUrl } from "../../../../utils/image";
import { formatPrice } from "../../../../utils/formatPrice";

const ProductLatest = ({ data = [] }) => {
  return (
    <section>
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-8 col-md-12 ml-auto mr-auto">
            <div className="section-title">
              <h2 className="title">
                New <span>Arrivals</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="grid row columns-3">
              {data.slice(0, 6).map((it) => (
                <Link
                  to={`/products/${it.slug}`}
                  className="grid-item cat1"
                  key={it.id}
                >
                  <div className="product-item product-label-new">
                    <div className="product-img">
                      <img
                        className="img-fluid tw-h-[400px] tw-object-cover"
                        src={getImageUrl(it.image)}
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
                        {it.name}
                      </a>
                      <span className="product-price">
                        {formatPrice(it.product_variants?.[0]?.price)}
                      </span>
                    </div>
                    <div className="product-btn">
                      <button className="btn btn-theme btn-block">
                        <span>Add to Cart</span>{" "}
                        <i className="fas fa-shopping-cart" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLatest;
