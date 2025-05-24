import { Table, Tag, Button } from "antd";
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
      title: "ID",
      dataIndex: "id",
      width: 70,
      align: "center",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      width: 150,
      render: (code) => <span className={styles.orderCode}>#{code}</span>,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, row) => {
        return (
          <div className={styles.customerInfo}>
            <p className="tw-mb-1 tw-font-semibold">{row.fullname}</p>
            <p className="tw-mb-1 tw-text-sm tw-text-gray-600">{row.phone}</p>
            <p className="tw-mb-1 tw-text-sm tw-text-gray-600">{row.email}</p>
            <p className="tw-mb-0 tw-text-sm tw-text-gray-500">
              📍 {row.address}
            </p>
          </div>
        );
      },
    },
    {
      title: "Tổng tiền",
      key: "total_price",
      dataIndex: "total_price",
      width: 150,
      align: "center",
      render: (totalPrice) => (
        <span className={styles.priceTag}>{formatPrice(totalPrice)}</span>
      ),
    },
    {
      title: "Phương thức TT",
      key: "payment",
      dataIndex: "payment",
      render: (payment) => <span className={styles.paymentTag}>{payment}</span>,
    },
    {
      title: "Trạng thái đơn hàng",
      key: "status",
      dataIndex: "status",
      width: 160,
      render: (status) => {
        const getStatusColor = (status) => {
          switch (status) {
            case "Đơn hàng đã hủy":
              return "red";
            case "Đã giao hàng":
              return "green";
            case "Đang giao hàng":
              return "blue";
            case "Đã xác nhận":
              return "orange";
            default:
              return "default";
          }
        };

        return (
          <Tag color={getStatusColor(status)} className={styles.statusTag}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái TT",
      key: "payment_status",
      dataIndex: "payment_status",
      width: 140,
      render: (paymentStatus) => (
        <Tag
          color={paymentStatus === "Đã thanh toán" ? "green" : "orange"}
          className={styles.paymentStatusTag}
        >
          {paymentStatus}
        </Tag>
      ),
    },
    {
      title: "Thời gian đặt hàng",
      key: "created_at",
      dataIndex: "created_at",
      width: 180,
      render: (date) => (
        <div className={styles.dateInfo}>
          <p className="tw-mb-0 tw-text-blue-600 tw-font-medium">
            {dayjs(date).format("DD/MM/YYYY")}
          </p>
          <p className="tw-mb-0 tw-text-sm tw-text-gray-500">
            {dayjs(date).format("HH:mm:ss")}
          </p>
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 100,
      align: "center",
      render: (_, row) => {
        return (
          <Link to={`/admin/orders/${row.id}`}>
            <Button
              type="primary"
              size="small"
              icon={<EyeFilled />}
              className={styles.viewButton}
              title="Xem chi tiết"
            >
              Xem
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>🛒 Quản lý đơn hàng</p>
      </div>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ x: 1400 }}
          pagination={{
            hideOnSinglePage: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} đơn hàng`,
          }}
          className={styles.customTable}
          size="large"
        />
      </div>
    </>
  );
};

export default OrderList;
