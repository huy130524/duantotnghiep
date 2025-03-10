import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./index.module.scss";
import { REG_EMAIL } from "../../../../constants/reg";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../api/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const registerMutation = useMutation({
    mutationKey: ["REGISTER"],
    mutationFn: (data) => api.post("/register", data),
    onSuccess: () => {
      message.success("Đăng ký thành công");

      navigate("/login");
    },
    onError: (error) => {
      const err = error.response.data.errors;
      const msg = Object.keys(err).map((key) => err[key].join(","));

      message.error(msg.join(", "));
    },
  });

  const onSubmit = (values) => {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
      fullname: values.fullName,
    });
  };

  return (
    <>
      {/*page title start*/}
      <section
        className={`page-title o-hidden ${styles.pageTitle}`}
        data-bg-img="/images/bg/02.jpg"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12">
              <h1 className="mb-3">
                Register <span className="text-theme">Now</span>
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-4 justify-content-end">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="fas fa-home" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Register
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
        {/*login start*/}
        <section className="register">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 ml-auto mr-auto">
                <div className="register-form text-center">
                  <h2 className="title mb-5">
                    Đăng ký <span>ngay bây giờ</span>
                  </h2>
                  <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    <div className="messages" />
                    <div>
                      <div className="form-group">
                        {" "}
                        <i className="far fa-user" />
                        <input
                          id="form_name"
                          type="text"
                          className="form-control"
                          placeholder="Họ và tên"
                          {...register("fullName", {
                            required: "Vui lòng nhập họ tên",
                          })}
                        />
                        {errors?.fullName?.message && (
                          <div className="help-block with-errors">
                            {errors.fullName.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      {" "}
                      <i className="far fa-envelope" />
                      <input
                        id="form_email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", {
                          required: "Vui lòng nhập email",
                          pattern: {
                            value: REG_EMAIL,
                            message: "Email không đúng định dạng",
                          },
                        })}
                      />
                      {errors?.email?.message && (
                        <div className="help-block with-errors">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      {" "}
                      <i className="fas fa-unlock-alt" />
                      <input
                        id="form_password"
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                        {...register("password", {
                          required: "Vui lòng nhập mật khẩu",
                        })}
                      />
                      {errors?.password?.message && (
                        <div className="help-block with-errors">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      {" "}
                      <i className="fas fa-unlock-alt" />
                      <input
                        id="form_password1"
                        type="password"
                        className="form-control"
                        placeholder="Xác nhận mật khẩu"
                        {...register("confirmPassword", {
                          required: "Vui lòng nhập lại mật khẩu",
                          validate: (value) =>
                            value === getValues("password") ||
                            "Mật khẩu xác nhận không chính xác",
                        })}
                      />
                      {errors?.confirmPassword?.message && (
                        <div className="help-block with-errors">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>

                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <button className="btn btn-theme btn-iconic">
                          <span>
                            Đăng ký{" "}
                            <i className="fas fa-long-arrow-alt-right" />
                          </span>
                        </button>
                      </div>
                      <div className="col-md-6 sm-mt-3">
                        <h5 className="mb-0 text-capitalize">
                          Đã Có Tài Khoản ?{" "}
                          <Link to="/login">
                            <i>Đăng Nhập!</i>
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*login end*/}
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
      {/*body content end*/}
    </>
  );
};

export default RegisterPage;
