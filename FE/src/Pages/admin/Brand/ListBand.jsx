import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, Table } from "antd";
import { getImageUrl2 } from "../../../utils/image";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined } from "@ant-design/icons";

const ListBrand = () => {
  const { data } = useQuery({
    queryKey: ["LIST_BRAND"],
    queryFn: () => api.get("/brands"),
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Tên thương hiệu",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Logo",
      key: "logo",
      dataIndex: "logo",
      render: (image) => {
        const url = getImageUrl2(image);

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
          {/* <Popconfirm
            title="Xoá danh mục"
            description="Xác nhận xoá danh mục sản phẩm"
            cancelText="Huỷ"
            okText="Xác nhận"
          >
            <DeleteOutlined
              className={classnames(styles.icon, styles.deleteIcon)}
            />
          </Popconfirm> */}

          <Link to={`/admin/brand/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách thương hiệu</p>

        <Link to="/admin/brand/add">
          <Button type="primary">Thêm thương hiệu</Button>
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

export default ListBrand;
