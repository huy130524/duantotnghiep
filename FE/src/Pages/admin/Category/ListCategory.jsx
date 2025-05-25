import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ListCategory = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_CATEGORY"],
    queryFn: () => api.get("/categories"),
  });

  const removeCategoryMutation = useMutation({
    mutationKey: ["REMOVE_CATEGORY"],
    mutationFn: (id) => api.delete("/category/delete/" + id),
    onSuccess: () => {
      message.success("Xoá danh mục thành công");
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
      title: "Tên danh mục",
      key: "name",
      dataIndex: "name",
      render: (name) => <span className={styles.categoryTag}>{name}</span>,
    },
    {
      title: "Hình ảnh",
      key: "image",
      dataIndex: "image",
      align: "center",
      render: (image) => {
        return (
          <Image
            src={image}
            width={80}
            height={80}
            className={styles.image}
            style={{ borderRadius: "8px" }}
          />
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
            title="Xoá danh mục"
            description="Xác nhận xoá danh mục"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeCategoryMutation.mutate(record.id)}
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>

          <Link to={`/admin/category/${record.id}/edit`}>
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
        <p className={styles.title}>📁 Danh sách danh mục</p>

        <Link to="/admin/category/add">
          <Button type="primary" size="large" className={styles.addButton}>
            ➕ Thêm danh mục
          </Button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} danh mục`,
          }}
          rowKey="id"
          className={styles.customTable}
        />
      </div>
    </>
  );
};

export default ListCategory;
