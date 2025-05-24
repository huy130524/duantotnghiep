import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getImageUrl2 } from "../../../utils/image";

const ListBlog = () => {
  const { data } = useQuery({
    queryKey: ["LIST_BLOG"],
    queryFn: () => api.get("/blogs"),
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
      title: "Tiêu đề",
      key: "title",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      key: "image",
      width: 120,
      align: "center",
      render: (_, record) => {
        return (
          <Image
            src={getImageUrl2(record.image)}
            width={80}
            height={80}
            className={styles.blogImage}
            style={{ objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Danh mục",
      key: "category",
      render: (_, record) => {
        return (
          <span className={styles.categoryTag}>{record.category.name}</span>
        );
      },
    },
    {
      title: "Tác giả",
      key: "user",
      render: (_, record) => {
        return <span className={styles.authorTag}>{record.user.fullname}</span>;
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (_, record) => {
        return dayjs(record.created_at).format("DD/MM/YYYY");
      },
    },
    {
      title: "Hành động",
      key: "actions",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={12}>
          <Link to={`/admin/blog/${record.id}/edit`}>
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
        <p className={styles.title}>📋 Danh sách bài viết</p>

        <Link to="/admin/blog/add">
          <Button type="primary" size="large" className={styles.addButton}>
            ✍️ Thêm bài viết
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
              `${range[0]}-${range[1]} của ${total} bài viết`,
          }}
          rowKey="id"
          className={styles.customTable}
          size="large"
        />
      </div>
    </>
  );
};

export default ListBlog;
