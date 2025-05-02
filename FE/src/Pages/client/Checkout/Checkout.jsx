import { useQuery, useMutation } from "@tanstack/react-query";
import PageTitle from "./PageTitle/PageTitle";
import { api } from "../../../api/api";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import { getDiscount } from "../../../utils/getDiscount";
import { useDispatch, useSelector } from "react-redux";
import { clearCoupon, selectCoupon } from "../../../store/couponReducer";
import { PAYMENT_METHODS } from "../../../constants";
import { PlusOutlined } from "@ant-design/icons";
import SelectAddressModal from "./SelectAddressModal";
import { getPrice } from "../../../utils/getPrice";
import { useForm } from "react-hook-form";
import { useProfile } from "../../../hooks/useProfile";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { client } from "../../../main";

const Checkout = () => {
  const couponApplied = useSelector(selectCoupon);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { profile } = useProfile();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      paymentMethod: PAYMENT_METHODS.COD,
    },
  });

  const { data } = useQuery({
    queryKey: ["CART"],
    queryFn: async () => {
      const r = await api.get("/cart");

      return r.cart ?? [];
    },
  });

  const checkoutMutation = useMutation({
    mutationKey: ["CHECKOUT"],
    mutationFn: async (values) => {
      const r = await api.post("/orders/tao-don", values);

      return r;
    },
    onSuccess: (r) => {
      dispatch(clearCoupon());

      if (r?.payment_url) {
        window.location.href = r.payment_url;
      } else {
        navigate("/thank-you");
        client.invalidateQueries(["CART"]);
      }
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi đặt hàng");
    },
  });

  useEffect(() => {
    setValue("fullname", profile?.fullname);
    setValue("email", profile?.email);
    setValue("phone", selectedAddress?.phone);

    if (selectedAddress) {
      const address =
        selectedAddress.street +
        ", " +
        selectedAddress.district +
        ", " +
        selectedAddress.city;
      setValue("address", address);
    }
  }, [profile?.fullname, setValue, selectedAddress, profile?.email]);

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      const r = await api.get("/addresses");
      const defaultAddress = r.find((it) => it.is_default);

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    };
    fetchDefaultAddress();
  }, []);

  const totalPrice = useMemo(() => {
    return data?.reduce((acc, it) => {
      const price = parseFloat(it.product_variant.sale_price);
      const originalPrice = parseFloat(it.product_variant.price);
      const finalPrice = price > 0 ? price : originalPrice;
      return acc + finalPrice * it.quantity;
    }, 0);
  }, [data]);

  const discountInfo = getDiscount(totalPrice, couponApplied);

  const onSubmit = (values) => {
    const payload = {
      fullname: values.fullname,
      phone: values.phone,
      email: values.email,
      address: values.address,
      payment: values.paymentMethod,
      total_price: totalPrice,
      items: data.map((it) => {
        return {
          variant_id: it.product_variant.id,
          price: getPrice(it.product_variant),
          quantity: it.quantity,
          total_price: getPrice(it.product_variant) * it.quantity,
        };
      }),
    };

    checkoutMutation.mutate(payload);
  };

  return (
    <>
      <PageTitle />

      {/*page title end*/}
      {/*body content start*/}
      <form className="page-content" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12">
                <SelectAddressModal
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                >
                  <button className="btn btn-theme tw-mb-4 tw-ml-auto tw-block">
                    <PlusOutlined className="tw-mr-2" />
                    Chọn địa chỉ
                  </button>
                </SelectAddressModal>

                <div className="checkout-form box-shadow white-bg px-5 py-5 md-px-3 md-py-3 xs-px-2 xs-py-2">
                  <h3 className="mb-4">
                    Chi tiết <span className="text-theme">Hoá đơn</span>
                  </h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Họ và tên</label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="Họ và tên"
                          {...register("fullname", {
                            required: "Vui lòng nhập họ và tên",
                          })}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="Email"
                          {...register("email", {
                            required: "Vui lòng nhập email",
                          })}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="Số điện thoại"
                          {...register("phone", {
                            required: "Vui lòng nhập số điện thoại",
                          })}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Địa chỉ nhận hàng</label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="Địa chỉ nhận hàng"
                          {...register("address", {
                            required: "Vui lòng nhập địa chỉ",
                          })}
                        />
                      </div>
                    </div>
                  </div>
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

                    {discountInfo && (
                      <li className="mb-2">
                        <span>Giảm giá:</span>

                        {discountInfo.text}
                      </li>
                    )}

                    <li>
                      <span>
                        <strong className="cart-total">Tổng tiền:</strong>
                      </span>
                      <strong className="cart-total">
                        {formatPrice(totalPrice - (discountInfo?.value ?? 0))}
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
                        id={PAYMENT_METHODS.COD}
                        name="customRadio"
                        className="custom-control-input"
                        value={PAYMENT_METHODS.COD}
                        {...register("paymentMethod")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={PAYMENT_METHODS.COD}
                      >
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id={PAYMENT_METHODS.VNPay}
                        name="customRadio"
                        className="custom-control-input"
                        value={PAYMENT_METHODS.VNPay}
                        {...register("paymentMethod")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={PAYMENT_METHODS.VNPay}
                      >
                        VNPay
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-theme btn-block" type="submit">
                  Đặt hàng
                </button>
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
                  <div id="mc-form" className="group row align-items-center">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*newsletter end*/}
      </form>
    </>
  );
};

export default Checkout;
