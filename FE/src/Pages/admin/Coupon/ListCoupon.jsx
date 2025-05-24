import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import dayjs from "dayjs";
import { formatPrice } from "../../../utils/formatPrice";

const ListCoupon = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_COUPON"],
    queryFn: () => api.get("/coupons"),
  });

  const removeCouponMutation = useMutation({
    mutationKey: ["REMOVE_COUPON"],
    mutationFn: (id) => api.delete("/coupon/delete/" + id),
    onSuccess: () => {
      message.success("Xoá mã giảm giá thành công");
      refetch();
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
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
          ? `${parseFloat(record.discount)}%`
          : formatPrice(record.discount);
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
          <Popconfirm
            title="Xoá mã giảm giá"
            description="Xác nhận xoá mã giảm giá"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeCouponMutation.mutate(record.id)}
          >
            <DeleteOutlined
              className={classNames(styles.icon, styles.deleteIcon)}
            />
          </Popconfirm>

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
