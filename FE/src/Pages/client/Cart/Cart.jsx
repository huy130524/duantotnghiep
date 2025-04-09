import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import NewsLetter from "../HomePage/NewsLetter/NewsLetter";
import { Empty, message, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/image";
import { formatPrice } from "../../../utils/formatPrice";
import { useMemo } from "react";

export const getPrice = (data) => {
  const salePrice = parseFloat(data?.sale_price);
  const originalPrice = parseFloat(data?.price);

  if (salePrice > 0) {
    return salePrice;
  }

  return originalPrice;
};

const Cart = () => {
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["CART"],
    queryFn: async () => {
      const r = await api.get("/cart");

      return r.cart ?? [];
    },
  });

  const totalPrice = useMemo(() => {
    return data?.reduce((acc, it) => {
      const price = parseFloat(it.product_variant.sale_price);
      const originalPrice = parseFloat(it.product_variant.price);
      const finalPrice = price > 0 ? price : originalPrice;
      return acc + finalPrice * it.quantity;
    }, 0);
  }, [data]);

  const updateQuantityMutation = useMutation({
    mutationKey: ["UPDATE_CART"],
    mutationFn: async ({ id, quantity }) => {
      const r = await api.post(`/cart/change/${id}`, { quantity });

      return r.cart;
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      message.error("Error updating cart");
    },
  });

  const deleteCartMutation = useMutation({
    mutationKey: ["DELETE_CART"],
    mutationFn: async (id) => {
      const r = await api.delete(`/cart/delete/${id}`);

      return r.cart;
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      message.error("Error deleting cart");
    },
  });

  return (
    <>
      <section className="page-title o-hidden tw-bg-[url(/images/bg/02.jpg)]">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <h1 className="mb-3">
                Product <span className="text-theme">Cart</span>
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-4 justify-content-end">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="fas fa-home" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Product Cart
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
            <div className="row align-items-center">
              <div className="col-md-12">
                {data?.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table cart-table text-center">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((it) => {
                            const price = getPrice(it.product_variant);

                            return (
                              <tr key={it.id}>
                                <td>
                                  <div className="cart-img">
                                    <a href="#">
                                      <img
                                        className="img-center tw-w-[100px] tw-h-[100px] tw-object-cover tw-border tw-border-solid tw-border-[#eee]"
                                        alt=""
                                        src={getImageUrl(it.product.image)}
                                      />
                                    </a>
                                  </div>
                                </td>
                                <td className="tw-text-left">
                                  <Link to={`/products/${it.product.slug}`}>
                                    {it.product.name}
                                  </Link>

                                  <p className="tw-m-0">
                                    Size: {it.product_variant.size.name}
                                  </p>
                                  <p className="tw-m-0">
                                    Color: {it.product_variant.color.name}
                                  </p>
                                </td>
                                <td>{formatPrice(price)}</td>
                                <td>
                                  <div className="cart-action">
                                    <button
                                      className="btn-product"
                                      onClick={() => {
                                        if (it.quantity <= 1) {
                                          return;
                                        }
                                        updateQuantityMutation.mutate({
                                          id: it.id,
                                          quantity: it.quantity - 1,
                                        });
                                      }}
                                    >
                                      <i className="fas fa-minus" />
                                    </button>
                                    <input
                                      className="form-product"
                                      type="number"
                                      name="form-product"
                                      readOnly
                                      value={it.quantity}
                                    />
                                    <button
                                      className="btn-product"
                                      onClick={() => {
                                        updateQuantityMutation.mutate({
                                          id: it.id,
                                          quantity: it.quantity + 1,
                                        });
                                      }}
                                    >
                                      <i className="fas fa-plus" />
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  <Popconfirm
                                    title="Delete this item?"
                                    onConfirm={() =>
                                      deleteCartMutation.mutate(it.id)
                                    }
                                  >
                                    <button type="submit" className="btn-delet">
                                      <i className="far fa-trash-alt" />
                                    </button>
                                  </Popconfirm>
                                </td>
                                <td>{formatPrice(it.quantity * price)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="row align-items-end sm-mt-3">
                      <div className="col-md-7">
                        <h5>Coupon Code</h5>
                        <p>Enter Your Coupon Code</p>
                        <form className="form-inline coupon-form">
                          <div className="form-group">
                            <input type="text" className="form-control" />
                            <button className="btn btn-theme" type="submit">
                              Apply Coupon
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-5 text-md-right">
                        <div className="checkout-box white-bg box-shadow mt-5">
                          <ul className="list-unstyled mb-3">
                            <li className="mb-2">
                              <span>Tạm tính:</span>
                              {formatPrice(totalPrice)}
                            </li>
                            {/* <li className="mb-2">
                              <span> VAT (20%) : </span> $ 498.00
                            </li> */}
                            <li>
                              <span>
                                <strong className="cart-total">
                                  Tổng tiền:
                                </strong>
                              </span>
                              <strong className="cart-total">
                                {formatPrice(totalPrice)}
                              </strong>
                            </li>
                          </ul>
                          <button
                            className="btn btn-sm btn-theme"
                            onClick={() => navigate("/checkout")}
                          >
                            Tiến hành thanh toán
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Empty className="tw-my-20" />
                )}
              </div>
            </div>
          </div>
        </section>

        <NewsLetter />
      </div>
    </>
  );
};

export default Cart;
