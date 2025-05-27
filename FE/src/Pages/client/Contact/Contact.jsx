import { useForm } from "react-hook-form";
import NewsLetter from "../HomePage/NewsLetter/NewsLetter";
import { useProfile } from "../../../hooks/useProfile";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { message } from "antd";

const Contact = () => {
  const { profile } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitContactMutation = useMutation({
    mutationKey: ["SUBMIT_CONTACT"],
    mutationFn: (data) => api.post("/contacts/add", data),
    onSuccess: () => {
      message.success("Gửi thông tin thành công");

      reset({
        fullname: profile?.fullname || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        address: profile?.address || "",
        contact: "",
      });
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullname: profile?.fullname || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        address: profile?.address || "",
      });
    }
  }, [profile]);

  const onSubmit = (data) => {
    submitContactMutation.mutate(data);
  };

  return (
    <>
      <section className="page-title o-hidden tw-bg-[url(/images/bg/02.jpg)]">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <h1 className="mb-3">
                Contact <span className="text-theme">us</span>
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-4 justify-content-end">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="fas fa-home" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">contact us</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
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
        {/*address start*/}
        <section className="pb-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="text-black form-info white-bg text-center box-shadow">
                  <ul className="contact-info list-inline d-flex flex-md-row flex-column justify-content-between align-items-between">
                    <li>
                      <i className="flaticon-location" />
                      <span>Address:</span>
                      <p>Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</p>
                      <span className="contact-icon">
                        <i className="flaticon-location" />
                      </span>
                    </li>
                    <li className="theme-bg text-white">
                      <i className="flaticon-call" />
                      <span>Phone:</span>
                      <a href="tel:+912345678900">0983 983 983</a>
                      <span className="contact-icon">
                        <i className="flaticon-call" />
                      </span>
                    </li>
                    <li>
                      <i className="flaticon-email" />
                      <span>Email</span>
                      <a href="mailto:themeht23@gmail.com">
                        contact@beesneaker.com
                      </a>
                      <span className="contact-icon">
                        <i className="flaticon-email" />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*address end*/}
        {/*contact start*/}
        <section className="contact-1">
          <div className="container">
            <div className="row row-eq-height no-gutters">
              <div className="col-lg-8 col-md-12 order-lg-12">
                <div className="contact-main white-bg">
                  <h2 className="title mb-4">
                    Contact Us For <span>Help</span>
                  </h2>
                  <form className="row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="messages" />
                    <div className="form-group col-sm-6">
                      <input
                        id="form_name"
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        {...register("fullname", {
                          required: "Họ và tên không được để trống",
                        })}
                      />

                      {errors.fullname?.message && (
                        <div className="help-block with-errors">
                          {errors.fullname.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-sm-6">
                      <input
                        id="form_email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email không được để trống",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email không hợp lệ",
                          },
                        })}
                      />

                      {errors?.email?.message && (
                        <div className="help-block with-errors">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-sm-6">
                      <input
                        id="form_phone"
                        type="tel"
                        className="form-control"
                        placeholder="Số điện thoại"
                        {...register("phone", {
                          required: "Số điện thoại không được để trống",
                          pattern: {
                            value: /^[0-9]{10,11}$/,
                            message: "Số điện thoại không hợp lệ",
                          },
                        })}
                      />

                      {errors?.phone?.message && (
                        <div className="help-block with-errors">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-sm-6">
                      <input
                        id="form_subject"
                        type="text"
                        className="form-control"
                        placeholder="Địa chỉ"
                        {...register("address", {
                          required: "Địa chỉ không được để trống",
                        })}
                      />

                      {errors?.address?.message && (
                        <div className="help-block with-errors">
                          {errors.address.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-sm-12">
                      <textarea
                        id="form_message"
                        className="form-control"
                        placeholder="Nội dung"
                        rows={4}
                        {...register("contact", {
                          required: "Nội dung không được để trống",
                        })}
                      />

                      {errors?.contact?.message && (
                        <div className="help-block with-errors">
                          {errors.contact.message}
                        </div>
                      )}
                    </div>

                    <div className="col-sm-12">
                      <button
                        className="btn btn-border btn-radius"
                        type="submit"
                      >
                        <span>Gửi tin nhắn</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 order-lg-1">
                <div className="map h-100 iframe-h-m">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.210135168819!2d105.74836551492992!3d21.02283539348679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b6d52f3c3%3A0x41b8eae9d4cbd83f!2zVHLhu4tuaCBWxINuIELhuqEsIFBoxrDhu51uZyBDYW5oLCBOYW0gVMawIExpw6ptLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1svi!2s!4v1716793249075!5m2!1svi!2s"></iframe>

                </div>
              </div>
            </div>
          </div>
        </section>
        {/*contact end*/}

        <NewsLetter />
      </div>
    </>
  );
};

export default Contact;
