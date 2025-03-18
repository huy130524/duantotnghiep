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
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Hình ảnh",
      key: "image",
      dataIndex: "image",
      render: (image) => {
        const url = getImageUrl(image);

        return (
          <Image src={url} width={100} height={100} className={styles.image} />
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Link to={`/admin/product/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách sản phẩm</p>

        <Link to="/admin/product/add">
          <Button type="primary">Thêm sản phẩm</Button>
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

export default ListProduct;
