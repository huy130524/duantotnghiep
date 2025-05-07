import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, message, Popconfirm, Spin, Table } from "antd";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { formatPrice } from "../../../utils/formatPrice";

import styles from "./index.module.scss";
import { useMemo } from "react";

const ConfirmPopup = ({ children, onConfirm }) => {
  return (
    <Popconfirm
      title="Cập nhật trạng thái ĐH"
      description="Xác nhận cập nhật trạng thái ĐH?"
      onConfirm={onConfirm}
    >
      <span>{children}</span>
    </Popconfirm>
  );
};

const OrderDetail = () => {
  const params = useParams();
  const orderId = params.id;

  const { data, refetch } = useQuery({
    queryKey: ["ORDER_DETAIL", params?.id],
    queryFn: async () => {
      const r = await api.get(`/admin-orders/detail/${params.id}`);

      return r;
    },
  });

  const totalPrice = useMemo(() => {
    return data?.order_details.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [data]);

  const updateStatusMutation = useMutation({
    mutationKey: ["UPDATE_ORDER_STATUS", orderId],
    mutationFn: (status) => {
      return api.post(`/admin-order-status-update/${orderId}`, { status });
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái đơn hàng thành công");
      refetch();
    },
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => ++index,
    },
    {
      title: "Tên SP",
      key: "product",
      render: (_, record) => record.variant?.product?.name,
    },
    {
      title: "Đơn giá",
      key: "price",
      dataIndex: "price",
      render: formatPrice,
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Thành tiền",
      key: "total_price",
      dataIndex: "total_price",
      render: formatPrice,
    },
  ];

  const updateOrderStatus = async ({ status }) => {
    updateStatusMutation.mutate(status);
  };

  const renderActButton = () => {
    if (!data) return;

    switch (data.status) {
      case "Chờ xác nhận": {
        return (
          <div className="tw-flex tw-gap-2">
            <ConfirmPopup
              onConfirm={() => updateOrderStatus({ status: "Đơn hàng đã hủy" })}
            >
              <Button danger>Huỷ ĐH</Button>
            </ConfirmPopup>

            <ConfirmPopup
              onConfirm={() => updateOrderStatus({ status: "Đã xác nhận" })}
            >
              <Button type="primary">Xác nhận ĐH</Button>
            </ConfirmPopup>
          </div>
        );
      }

      case "Đã xác nhận": {
        return (
          <ConfirmPopup
            onConfirm={() =>
              updateOrderStatus({ status: "Đang chuẩn bị hàng" })
            }
          >
            <Button type="primary">Chuẩn bị hàng</Button>
          </ConfirmPopup>
        );
      }

      case "Đang chuẩn bị hàng": {
        return (
          <ConfirmPopup
            onConfirm={() => updateOrderStatus({ status: "Đang giao hàng" })}
          >
            <Button type="primary">Giao hàng</Button>
          </ConfirmPopup>
        );
      }

      case "Đang giao hàng": {
        return (
          <ConfirmPopup
            onConfirm={() => updateOrderStatus({ status: "Đã giao hàng" })}
          >
            <Button type="primary">Đã giao hàng</Button>
          </ConfirmPopup>
        );
      }

      default:
        return "";
    }
  };

  if (!data) return <Spin />;

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Chi tiết đơn hàng #{data?.code}</p>

        {renderActButton()}
      </div>

      <Card>
        <div className="tw-grid tw-grid-cols-12 tw-gap-3">
          <div className="tw-col-span-6">
            <p className="tw-text-base tw-leading-8 tw-mb-2">
              Tên người nhận: {data?.fullname}
            </p>
            <p className="tw-text-base tw-leading-7 tw-mb-2">
              Email: {data?.email}
            </p>
            <p className="tw-text-base tw-leading-7 tw-mb-2">
              Số điện thoại: {data?.phone}
            </p>
            <p className="tw-text-base tw-leading-7 tw-mb-2">
              Địa chỉ: {data?.address}
            </p>
          </div>

          <div className="tw-col-span-6">
            <p className="tw-text-base tw-leading-8 tw-mb-2">
              Phương thức thanh toán: {data?.payment}
            </p>
            <p className="tw-text-base tw-leading-7 tw-mb-2">
              Trạng thái đơn hàng: {data?.status}
            </p>
            <p className="tw-text-base tw-leading-7 tw-mb-2">
              Trạng thái thanh toán: {data?.payment_status}
            </p>
          </div>
        </div>
      </Card>

      <h2 className="tw-font-semibold tw-text-2xl tw-mb-3 tw-mt-6">Sản phẩm</h2>

      <Table
        columns={columns}
        dataSource={data?.order_details}
        rowKey="id"
        scroll={{ x: 900 }}
        pagination={false}
      />

      <div className="tw-text-center tw-mt-6">
        <p className="tw-text-base">Tạm tính: {formatPrice(totalPrice)}</p>

        {data?.voucher_code && (
          <p className="tw-text-base">
            Giảm giá: {formatPrice(data?.discount)}
          </p>
        )}

        <p className="tw-text-2xl tw-mt-4 tw-text-center tw-font-semibold">
          Tổng tiền: {formatPrice(data?.total_price)}
        </p>
      </div>
    </>
  );
};

export default OrderDetail;
