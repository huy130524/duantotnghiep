import { useMutation } from "@tanstack/react-query";
import { Button, Result } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../api/api";
import { useEffect } from "react";
import { client } from "../../../main";

const VNPayReturn = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const status = searchParams.get("vnp_TransactionStatus");
  const txnRef = searchParams.get("vnp_TxnRef");

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_PAYMENT_STATUS"],
    mutationFn: () => {
      return api.get("/payment/return", {
        params: {
          vnp_ResponseCode: status,
          vnp_TxnRef: txnRef,
        },
      });
    },
    onSuccess: () => {
      client.invalidateQueries(["CART"]);
    },
  });

  useEffect(() => {
    status && txnRef && mutate();
  }, [status, txnRef]);

  return (
    <div className="container container-lg tw-min-h-[60vh] tw-flex tw-flex-col tw-justify-center tw-pt-[100px]">
      {status === "00" ? (
        <Result
          title="Thanh toán thành công"
          status="success"
          subTitle="Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng trong thời gian sớm nhất!"
          extra={[
            <Button onClick={() => navigate("/")} key="home">
              Về trang chủ
            </Button>,
            <Button
              onClick={() => navigate("/profile/order")}
              type="primary"
              key="my-order"
            >
              Đơn hàng của tôi
            </Button>,
          ]}
        />
      ) : (
        <Result
          title="Thanh toán thất bại"
          status="error"
          subTitle="Đã xảy ra lỗi trong quá trình thanh toán, vui lòng thử lại!"
          extra={[
            <Button onClick={() => navigate("/")} key="home" type="primary">
              Về trang chủ
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default VNPayReturn;
