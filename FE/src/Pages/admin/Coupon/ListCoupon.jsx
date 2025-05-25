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
      align: "center",
    },
    {
      title: "Mã giảm giá",
      key: "code",
      dataIndex: "code",
      ellipsis: true,
    },
    {
      title: "Giảm giá",
      key: "discount",
      align: "center",
      render: (_, record) => {
        const value =
          record.discount_type === "percentage"
            ? `${parseFloat(record.discount)}%`
            : formatPrice(record.discount);
        return <span className={styles.discountTag}>{value}</span>;
      },
    },
    {
      title: "Trạng thái",
      key: "active",
      align: "center",
      render: (_, record) => (
        <span
          className={classNames(styles.statusTag, {
            [styles.active]: record.is_active,
            [styles.inactive]: !record.is_active,
          })}
        >
          {record.is_active ? "Đang hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      title: "Số lượt sử dụng",
      key: "usage_limit",
      dataIndex: "usage_limit",
      align: "center",
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      title: "Giới hạn/người",
      key: "usage_limit_per_user",
      dataIndex: "usage_limit_per_user",
      align: "center",
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      title: "Đã sử dụng",
      key: "used_count",
      dataIndex: "used_count",
      align: "center",
      render: (value) => value?.toLocaleString() || 0,
    },
    {
      title: "Thời gian hiệu lực",
      key: "expired_at",
      render: (_, record) => {
        return (
          <div style={{ fontSize: "12px", lineHeight: "1.4" }}>
            <div>{dayjs(record.start_date).format("DD/MM/YYYY HH:mm")}</div>
            <div style={{ color: "#8c8c8c" }}>đến</div>
            <div>{dayjs(record.end_date).format("DD/MM/YYYY HH:mm")}</div>
          </div>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={12}>
          <Popconfirm
            title="Xoá mã giảm giá"
            description="Xác nhận xoá mã giảm giá"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeCouponMutation.mutate(record.id)}
          >
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              className={classNames(styles.deleteButton)}
            >
              Xoá
            </Button>
          </Popconfirm>

          <Link to={`/admin/coupon/${record.id}/edit`}>
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              className={styles.editButton}
            >
              Sửa
            </Button>
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>🎫 Danh sách mã giảm giá</p>

        <Link to="/admin/coupon/add">
          <Button type="primary" size="large" className={styles.addButton}>
            ➕ Thêm mã giảm giá
          </Button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={{
            hideOnSinglePage: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} mã giảm giá`,
          }}
          rowKey="id"
          className={styles.customTable}
          size="large"
          scroll={{ x: 1200 }}
        />
      </div>
    </>
  );
};

export default ListCoupon;
