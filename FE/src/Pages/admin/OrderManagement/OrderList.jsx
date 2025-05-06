import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { EyeFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { formatPrice } from "../../../utils/formatPrice";

import styles from "./index.module.scss";

const OrderList = () => {
  const { data } = useQuery({
    queryKey: ["ADMIN_ORDER_LIST"],
    queryFn: () => api.get("/admin-orders"),
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => ++index,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, row) => {
        return (
          <>
            <p className="tw-mb-0">Họ tên: {row.fullname}</p>
            <p className="tw-mb-0">Số điện thoại: {row.phone}</p>
            <p className="tw-mb-0">Email: {row.email}</p>
            <p className="tw-mb-0">Địa chỉ giao hàng: {row.address}</p>
          </>
        );
      },
    },
    {
      title: "Tổng tiền",
      key: "total_price",
      dataIndex: "total_price",
      render: (totalPrice) => formatPrice(totalPrice),
    },
    {
      title: "Phương thức thanh toán",
      key: "payment",
      dataIndex: "payment",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        return (
          <Tag color={status === "Đơn hàng đã hủy" ? "red" : "green"}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái TT",
      key: "payment_status",
      dataIndex: "payment_status",
    },
    {
      title: "Thời gian đặt hàng",
      key: "created_at",
      dataIndex: "created_at",
      render: (date) => (
        <p className="tw-text-blue-500 tw-mb-0">
          {dayjs(date).format("DD/MM/YYYY HH:mm:ss")}
        </p>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, row) => {
        return (
          <Link to={`/admin/orders/${row.id}`}>
            <EyeFilled className="text-lg" />
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Quản lý đơn hàng</p>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 1300 }}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};

export default OrderList;
