import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, Table } from "antd";
import { getImageUrl } from "../../../utils/image";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined } from "@ant-design/icons";

const ListProduct = () => {
  const { data } = useQuery({
    queryKey: ["LIST_PRODUCT"],
    queryFn: () => api.get("/products"),
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
      title: "Hình ảnh",
      key: "image",
      dataIndex: "image",
      width: 120,
      align: "center",
      render: (image) => {
        const url = getImageUrl(image);

        return (
          <Image
            src={url}
            width={80}
            height={80}
            className={styles.productImage}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        );
      },
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
      title: "Hành động",
      key: "actions",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={12}>
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
