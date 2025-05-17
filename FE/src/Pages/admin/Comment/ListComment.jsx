import styles from "./index.module.scss";

import { Table, Tooltip } from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import dayjs from "dayjs";

const ListComment = () => {
  const { data } = useQuery({
    queryKey: ["LIST_COMMENT"],
    queryFn: () => api.get("/comments"),
  });
  console.log("🚀 TDS ~ ListComment ~ data:", data);

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Sản phẩm",
      key: "product",
      render: (_, record) => record.product.name,
    },
    {
      title: "Nội dung",
      key: "content",
      width: "30%",
      dataIndex: "content",
      render: (text) => (
        <Tooltip
          title={<p className="tw-m-0 tw-whitespace-pre-line">{text}</p>}
        >
          <p className="tw-m-0 tw-line-clamp-3 tw-whitespace-pre-line">
            {text}
          </p>
        </Tooltip>
      ),
    },
    {
      title: "Đánh giá",
      key: "rating",
      render: (_, record) => <p>{record.rating}/5</p>,
    },
    {
      title: "Người dùng",
      key: "user",
      render: (_, record) => record.user.fullname,
    },
    {
      title: "Ngày tạo",
      key: "created_at",
      render: (_, record) =>
        dayjs(record.created_at).format("DD/MM/YYYY HH:mm:ss"),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách bình luận</p>
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

export default ListComment;
