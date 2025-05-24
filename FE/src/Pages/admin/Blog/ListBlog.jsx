import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import dayjs from "dayjs";
import { getImageUrl2 } from "../../../utils/image";

const ListBlog = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_BLOG"],
    queryFn: () => api.get("/blogs"),
  });

  const removeBlogMutation = useMutation({
    mutationKey: ["REMOVE_BLOG"],
    mutationFn: (id) => api.delete("/blog/delete/" + id),
    onSuccess: () => {
      message.success("Xoá bài viết thành công");
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
      width: 150,
      align: "center",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={12}>
          <Popconfirm
            title="Xoá bài viết"
            description="Xác nhận xoá bài viết"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeBlogMutation.mutate(record.id)}
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
