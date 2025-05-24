import styles from "../Product/index.module.scss";

import { Table, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import dayjs from "dayjs";

const ListComment = () => {
  const { data } = useQuery({
    queryKey: ["LIST_COMMENT"],
    queryFn: () => api.get("/comments"),
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      width: 70,
      align: "center",
    },
    {
      title: "Sản phẩm",
      key: "product",
      render: (_, record) => (
        <span className={styles.categoryTag}>{record.product.name}</span>
      ),
    },
    {
      title: "Nội dung",
      key: "content",
      width: "40%",
      dataIndex: "content",
      render: (text) => (
        <div className="tw-bg-gray-50 tw-p-2 tw-rounded">
          <Tooltip
            title={<p className="tw-m-0 tw-whitespace-pre-line">{text}</p>}
          >
            <p className="tw-m-0 tw-line-clamp-3 tw-whitespace-pre-line">
              {text}
            </p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      key: "rating",
      align: "center",
      width: 100,
      render: (_, record) => (
        <span className={styles.brandTag}>{record.rating}/5 ⭐</span>
      ),
    },
    {
      title: "Người dùng",
      key: "user",
      render: (_, record) => (
        <div className="tw-font-medium">{record.user.fullname}</div>
      ),
    },
    {
      title: "Ngày tạo",
      key: "created_at",
      align: "center",
      render: (_, record) =>
        dayjs(record.created_at).format("DD/MM/YYYY HH:mm"),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>💬 Danh sách bình luận</p>
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
              `${range[0]}-${range[1]} của ${total} bình luận`,
          }}
          rowKey="id"
          className={styles.customTable}
          size="large"
        />
      </div>
    </>
  );
};

export default ListComment;
