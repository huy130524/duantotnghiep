import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";

const ListProduct = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_PRODUCT"],
    queryFn: () => api.get("/products"),
  });

  const removeProductMutation = useMutation({
    mutationKey: ["REMOVE_PRODUCT"],
    mutationFn: (id) => api.delete("/product/delete/" + id),
    onSuccess: () => {
      message.success("Xoá sản phẩm thành công");
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
      title: "Tên sản phẩm",
      key: "name",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: "Danh mục",
      key: "category",
      dataIndex: "category",
      render: (category) => {
        return <span className={styles.categoryTag}>{category.name}</span>;
      },
    },
    {
      title: "Thương hiệu",
      key: "brand",
      dataIndex: "brand",
      render: (brand) => {
        return <span className={styles.brandTag}>{brand.name}</span>;
      },
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "product_variants",
      width: 120,
      align: "center",
      render: (variants) => {
        const totalQuantity =
          variants?.reduce(
            (sum, variant) => sum + (variant.quantity || 0),
            0
          ) || 0;

        return totalQuantity.toLocaleString();
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
            title="Xoá sản phẩm"
            description="Xác nhận xoá sản phẩm"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeProductMutation.mutate(record.id)}
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

          <Link to={`/admin/product/${record.id}/edit`}>
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
        <p className={styles.title}>📋 Danh sách sản phẩm</p>

        <Link to="/admin/product/add">
          <Button type="primary" size="large" className={styles.addButton}>
            📋 Thêm sản phẩm
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
              `${range[0]}-${range[1]} của ${total} sản phẩm`,
          }}
          rowKey="id"
          className={styles.customTable}
          size="large"
        />
      </div>
    </>
  );
};

export default ListProduct;
