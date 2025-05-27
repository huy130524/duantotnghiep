import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/image";
import { formatPrice } from "../../utils/formatPrice";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { client } from "../../main";
import { api } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

const ProductItem = ({ data }) => {
  const { isLogged } = useAuth();

  const addCartMutation = useMutation({
    mutationKey: ["ADD_CART"],
    mutationFn: (data) => api.post("/cart/add", data),
    onSuccess: () => {
      message.success("Added to cart successfully");

      client.invalidateQueries(["CART"]);
    },
    onError: () => {
      message.error("Failed to add to cart");
    },
  });

  const handleAddCart = (e) => {
    e.preventDefault();

    if (!isLogged) {
      message.info("Vui lòng đăng nhập để mua hàng");
      return;
    }

    addCartMutation.mutate({
      product_variant_id: data.product_variants[0].id,
      quantity: 1,
      product_id: data?.id,
    });
  };

  return (
    <Link to={`/products/${data.slug}`} className="grid-item cat1">
      <div className="product-item product-label-new">
        <div className="product-img">
          <img
            className="img-fluid tw-h-[400px] tw-object-cover"
            src={getImageUrl(data.product_variants[0].image)}
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
          <button className="btn btn-theme btn-block" onClick={handleAddCart}>
            <span>Add to Cart</span> <i className="fas fa-shopping-cart" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
