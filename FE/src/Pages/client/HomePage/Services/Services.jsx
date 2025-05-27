const Services = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <div className="featured-item">
              <div className="featured-icon">
                {" "}
                <i className="flaticon-shipped" />
              </div>
              <div className="featured-title text-uppercase">
                <h5>Giao hàng </h5>
              </div>
              <div className="featured-desc">
                <p>
                  Giao hàng nhanh chóng, an toàn và tiện lợi.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 md-mt-5">
            <div className="featured-item">
              <div className="featured-icon">
                {" "}
                <i className="flaticon-free-delivery" />
              </div>
              <div className="featured-title text-uppercase">
                <h5> Giao hàng toàn quốc</h5>
              </div>
              <div className="featured-desc">
                <p>
               Phục vụ mọi miền Tổ quốc – nhanh chóng và tận tâm.


                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 md-mt-5">
            <div className="featured-item">
              <div className="featured-icon">
                {" "}
                <i className="flaticon-refresh-left-arrow" />
              </div>
              <div className="featured-title text-uppercase">
                <h5> Hoàn trả hàng </h5>
              </div>
              <div className="featured-desc">
                <p>
                  Đổi trả dễ dàng trong vòng 15 ngày nếu không hài lòng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
