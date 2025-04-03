import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/image";
import { formatPrice } from "../../utils/formatPrice";

const ProductItem = ({ data }) => {
  return (
    <Link to={`/products/${data.slug}`} className="grid-item cat1">
      <div className="product-item product-label-new">
        <div className="product-img">
          <img
            className="img-fluid tw-h-[400px] tw-object-cover"
            src={getImageUrl(data.image)}
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
            {data.name}
          </a>
          <span className="product-price">
            {formatPrice(data.product_variants?.[0]?.price)}
          </span>
        </div>
        <div className="product-btn">
          <button className="btn btn-theme btn-block">
            <span>Add to Cart</span> <i className="fas fa-shopping-cart" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
