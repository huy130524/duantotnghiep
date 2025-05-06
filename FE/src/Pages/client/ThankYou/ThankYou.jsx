import { Button, Result } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tw-min-h-[50vh] tw-flex tw-flex-col tw-justify-center tw-pt-[200px] tw-pb-[100px]">
      <Result
        status="success"
        title="Đặt hàng thành công"
        subTitle="Cảm ơn bạn đã đặt hàng, chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng"
        extra={
          <Link to="/">
            <Button type="primary">Quay về trang chủ</Button>
          </Link>
        }
      />
    </div>
  );
};

export default ThankYou;
