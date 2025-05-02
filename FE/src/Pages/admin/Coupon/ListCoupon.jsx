import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ListCoupon = () => {
  const { data } = useQuery({
    queryKey: ["LIST_COUPON"],
    queryFn: () => api.get("/coupons"),
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Mã",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Giảm giá",
      key: "discount",
      render: (_, record) => {
        return record.discount_type === "percentage"
          ? `${record.discount}%`
          : `${record.discount.toLocaleString()}đ`;
      },
    },
    {
      title: "Trạng thái",
      key: "active",
      render: (_, record) =>
        record.is_active ? "Đang hoạt động" : "Không hoạt động",
    },
    {
      title: "Số lượt sử dụng",
      key: "usage_limit",
      dataIndex: "usage_limit",
    },
    {
      title: "Giới hạn số lần SD",
      key: "usage_limit_per_user",
      dataIndex: "usage_limit_per_user",
    },
    {
      title: "Số lượt đã SD",
      key: "used_count",
      dataIndex: "used_count",
    },
    {
      title: "Thời gian hiệu lực",
      key: "expired_at",
      render: (_, record) => {
        return `${dayjs(record.start_date).format(
          "DD/MM/YYYY HH:mm:ss"
        )} - ${dayjs(record.end_date).format("DD/MM/YYYY HH:mm:ss")}`;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Link to={`/admin/coupon/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách coupon</p>

        <Link to="/admin/coupon/add">
          <Button type="primary">Thêm coupon</Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{ hideOnSinglePage: true }}
        rowKey="id"
        scroll={{ x: 1200 }}
      />
    </>
  );
};

export default ListCoupon;
