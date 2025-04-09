import { useQuery } from "@tanstack/react-query";
import PageTitle from "./PageTitle/PageTitle";
import { api } from "../../../api/api";
import { useMemo } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import { getPrice } from "../Cart/Cart";

const Checkout = () => {
  const { data } = useQuery({
    queryKey: ["CART"],
    queryFn: async () => {
      const r = await api.get("/cart");

      return r.cart ?? [];
    },
  });
  console.log("🚀 352 ~ Checkout ~ data:", data);

  const totalPrice = useMemo(() => {
    return data?.reduce((acc, it) => {
      const price = parseFloat(it.product_variant.sale_price);
      const originalPrice = parseFloat(it.product_variant.price);
      const finalPrice = price > 0 ? price : originalPrice;
      return acc + finalPrice * it.quantity;
    }, 0);
  }, [data]);

  return (
    <>
      <PageTitle />

      {/*page title end*/}
      {/*body content start*/}
      <div className="page-content">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12">
                <div className="checkout-form box-shadow white-bg px-5 py-5 md-px-3 md-py-3 xs-px-2 xs-py-2">
                  <h3 className="mb-4">
                    Chi tiết <span className="text-theme">Hoá đơn</span>
                  </h3>
                  <form className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="Your firstname"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          id="lname"
                          className="form-control"
                          placeholder="Your lastname"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>E-mail Address</label>
                        <input
                          type="text"
                          id="email"
                          className="form-control"
                          placeholder="State Province"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          id="phone"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 md-mt-5">
                <div className="cart-detail px-5 py-5 md-px-3 md-py-3 xs-px-2 xs-py-2 dark-bg mb-5 text-white">
                  <h3 className="mb-3">
                    Cart <span className="text-theme">Total</span>
                  </h3>
                  <ul className="list-unstyled">
                    {data?.map((it) => {
                      const price = getPrice(it.product_variant);

                      return (
                        <li className="mb-3" key={it.id}>
                          <span>
                            {it.quantity} x {it.product.name}{" "}
                          </span>

                          {formatPrice(price * it.quantity)}
                        </li>
                      );
                    })}

                    <li>
                      <span>
                        <strong className="cart-total">Tổng tiền:</strong>
                      </span>
                      <strong className="cart-total">
                        {formatPrice(totalPrice)}
                      </strong>
                    </li>
                  </ul>
                </div>
                <div className="cart-detail px-5 py-5 md-px-3 md-py-3 xs-px-2 xs-py-2 grey-bg">
                  <h3 className="mb-3">
                    Phương thức <span className="text-theme">Thanh toán</span>
                  </h3>
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="customRadio1"
                        name="customRadio"
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio1"
                      >
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="customRadio2"
                        name="customRadio"
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio2"
                      >
                        VNPay
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-theme btn-block">Đặt hàng</button>
              </div>
            </div>
          </div>
        </section>
        {/*product end*/}
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
    </>
  );
};

export default Checkout;
