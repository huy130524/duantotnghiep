import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";

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
    },
    {
      title: "Hình ảnh",
      key: "image",
      dataIndex: "image",
      render: (image) => {
        return (
          <Image
            src={image}
            width={100}
            height={100}
            className={styles.image}
          />
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Popconfirm
            title="Xoá danh mục"
            description="Xác nhận xoá danh mục"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeCategoryMutation.mutate(record.id)}
          >
            <DeleteOutlined
              className={classNames(styles.icon, styles.deleteIcon)}
            />
          </Popconfirm>

          <Link to={`/admin/category/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách danh mục</p>

        <Link to="/admin/category/add">
          <Button type="primary">Thêm danh mục</Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ hideOnSinglePage: true }}
        rowKey="id"
      />
    </>
  );
};

export default ListCategory;
