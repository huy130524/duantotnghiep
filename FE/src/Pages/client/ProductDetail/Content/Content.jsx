import { useEffect, useMemo, useState } from "react";
import { getImageUrl } from "../../../../utils/image";
import { message, Select } from "antd";
import { formatPrice } from "../../../../utils/formatPrice";
import { api } from "../../../../api/api";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../../../main";

const Content = ({ data }) => {
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState(1);

  const { uniqueColors, uniqueSizes } = useMemo(() => {
    const uniqueColors = [
      ...new Map(data?.product_variants.map((item) => [item.color_id, item])),
    ].map(([, item]) => ({
      color_id: item.color_id,
      color_code: item.color.color_code,
    }));

    const uniqueSizes = [
      ...new Map(data?.product_variants.map((item) => [item.size_id, item])),
    ].map(([, item]) => ({
      size_id: item.size_id,
      size_name: item.size.name,
    }));

    return {
      uniqueColors,
      uniqueSizes,
    };
  }, [data?.product_variants]);

  const selectedVariant = useMemo(() => {
    return data?.product_variants.find(
      (item) => item.size_id === size && item.color_id === color
    );
  }, [data?.product_variants, size, color]);

  useEffect(() => {
    setSize(uniqueSizes[0]?.size_id);
    setColor(uniqueColors[0]?.color_id);
  }, [uniqueColors, uniqueSizes]);

  useEffect(() => {
    if (size && color && !selectedVariant) {
      message.error(
        "Không tìm thấy biến thể sản phẩm với kích thước và màu sắc đã chọn"
      );
      setSize(uniqueSizes[0]?.size_id);
      setColor(uniqueColors[0]?.color_id);
      setQuantity(1);
      return;
    }
  }, [color, selectedVariant, size, uniqueColors, uniqueSizes]);

  const addCartMutation = useMutation({
    mutationKey: ["ADD_CART"],
    mutationFn: (data) => api.post("/cart/add", data),
    onSuccess: () => {
      message.success("Added to cart successfully");

      setSize(uniqueSizes[0]?.size_id);
      setColor(uniqueColors[0]?.color_id);
      setQuantity(1);

      client.invalidateQueries(["CART"]);
    },
    onError: () => {
      message.error("Failed to add to cart");
    },
  });

  const renderPrice = () => {
    if (!selectedVariant) return <span className="mr-3">N/A</span>;

    const originalPrice = parseFloat(selectedVariant?.price);
    const salePrice = parseFloat(selectedVariant?.sale_price);

    if (salePrice > 0) {
      return (
        <span className="mr-3">
          {formatPrice(salePrice)}
          <del className="tw-ml-3">{formatPrice(originalPrice)}</del>
        </span>
      );
    }

    return <span className="mr-3">{formatPrice(originalPrice)}</span>;
  };

  const renderRating = () => {
    const comments = data?.comments || [];

    if (comments.length === 0) {
      return (
        <span className="review-rating">
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
        </span>
      );
    }

    const totalRating = comments.reduce(
      (sum, comment) => sum + (comment.rating || 0),
      0
    );
    const averageRating = totalRating / comments.length;

    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="review-rating">
        {Array.from({ length: fullStars }, (_, i) => (
          <i key={`full-${i}`} className="fas fa-star" />
        ))}

        {hasHalfStar && <i className="fas fa-star-half-alt" />}

        {Array.from({ length: emptyStars }, (_, i) => (
          <i key={`empty-${i}`} className="far fa-star" />
        ))}
      </span>
    );
  };

  const handleAddCart = () => {
    if (!selectedVariant) {
      message.error("Variant not found");
      return;
    }

    if (selectedVariant.quantity < quantity) {
      message.error("Not enough quantity available");
      return;
    }

    addCartMutation.mutate({
      product_id: data?.id,
      product_variant_id: selectedVariant?.id,
      quantity,
    });
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <div className="tw-flex tw-justify-center tw-items-center tw-h-full tw-border tw-border-solid tw-border-[#ececec] tw-rounded-md">
              <img
                className="img-fluid w-100 tw-block"
                src={getImageUrl(selectedVariant?.image)}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-12 md-mt-5">
            <div className="product-details">
              <h4>{data?.name}</h4>
              <div className="product-price my-4">
                {renderPrice()}

                {renderRating()}
              </div>
              <ul className="portfolio-meta list-unstyled mb-4">
                <li>
                  <span> Categories :</span> {data?.category?.name}
                </li>
              </ul>
              <p>{data?.description}</p>
              <div className="row my-4">
                <div className="col-sm-4">
                  <ul className="product-meta list-unstyled">
                    <li>
                      <h6 className="mb-2 text-black">Size</h6>

                      <Select
                        options={uniqueSizes?.map((it) => ({
                          label: it.size_name,
                          value: it.size_id,
                        }))}
                        className="tw-w-24"
                        value={size}
                        onChange={setSize}
                      />
                    </li>
                  </ul>
                </div>
                <div className="col-sm-8 xs-mt-3">
                  <div className="filter-color">
                    <h6 className="mb-2 text-black">Color</h6>
                    <ul className="list-inline">
                      {uniqueColors?.map((it) => (
                        <li key={it.color_id}>
                          <input
                            type="radio"
                            name="color"
                            id={`color-filter-${it.color_id}`}
                            className="checkbox-color-filter"
                            value={it.color_id}
                            checked={it.color_id === color}
                            onChange={() => setColor(it.color_id)}
                          />
                          <label
                            htmlFor={`color-filter-${it.color_id}`}
                            className="color-filter"
                            style={{ backgroundColor: it.color_code }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row my-4 align-items-end">
                <div className="col-sm-6">
                  <div>
                    <h6 className="mb-2 text-black">Quantity</h6>
                    <button
                      className="btn-product"
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <input
                      className="form-product"
                      type="number"
                      name="form-product"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > 0) {
                          setQuantity(value);
                        }
                      }}
                    />
                    <button
                      className="btn-product"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                </div>
                <div className="col-sm-6 xs-mt-3">
                  <div className="product-overlay">
                    <ul className="list-inline">
                      <li className="list-inline-item mb-0">
                        <a href="#">
                          {" "}
                          <i className="far fa-heart" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item mb-0">
                        <a href="#">
                          {" "}
                          <i className="far fa-eye" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item mb-0">
                        <a href="#">
                          {" "}
                          <i className="fas fa-signal" />{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-theme btn-iconic mt-3"
                onClick={handleAddCart}
              >
                Add to Cart <i className="fa fa-shopping-cart ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
