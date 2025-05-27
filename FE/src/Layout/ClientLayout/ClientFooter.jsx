const ClientFooter = () => {
  return (
    <footer className="footer dark-bg">
      <div className="primary-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 footer-list">
              <h5>Thông Tin </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="product.html">Sản phẩm bán chạy</a>
                </li>
                <li>
                  <a href="product.html">Sản phẩm mới</a>
                </li>
                <li>
                  <a href="#">Thông tin giao hàng</a>
                </li>
                <li>
                  <a href="terms-and-conditions.html">Điều khoản</a>
                </li>
                <li>
                  <a href="#">Ưu đãi đặc biệt</a>
                </li>
                <li>
                  <a href="#">Trung tâm trợ giúp</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 xs-mt-5 footer-list">
              <h5> Dịch vụ </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="order-tracking.html">Theo dõi đơn hàng</a>
                </li>
                <li>
                  <a href="contact-1.html">Chính sách khách hàng</a>
                </li>
                <li>
                  <a href="product.html">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="return-policy.html">Chính sách vận chuyển</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 md-mt-5 footer-list">
              <h5>Về Beesneaker </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Giới thiệu Beesneaker</a>
                </li>
                <li>
                  <a href="#">Tuyển dụng </a>
                </li>
                <li>
                  <a href="#">Danh sách cửa hàng </a>
                </li>
           
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 md-mt-5">
              <h5> Liên hệ với Beesneaker </h5>
              <ul className="media-icon list-unstyled">
                <li className="mb-4">
                  <p className="mb-0"> 32 ,Trinh Văn Bô, Nam Từ Liêm, Hà Nội </p>
                </li>
                <li className="mb-4">
                  <a href="mailto:themeht23@gmail.com">Gmail: contact@beesneaker.com</a>
                </li>
                <li className="mb-4">
                  <a href="tel:+912345678900"> Điện thoại: 036789999 </a>
                </li>
                <li>
                  <p className="mb-0">Giờ làm việc : 8h -21h </p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default ClientFooter;
