import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, Table, message, Popconfirm, Tag } from "antd";
import { getImageUrl2 } from "../../../utils/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";

const ListBrand = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_BRAND"],
    queryFn: () => api.get("/brands"),
  });

  const removeBrandMutation = useMutation({
    mutationKey: ["REMOVE_BRAND"],
    mutationFn: (id) => api.delete("/brand/delete/" + id),
    onSuccess: () => {
      message.success("Xoá thương hiệu thành công");
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
      title: "Tên thương hiệu",
      key: "name",
      dataIndex: "name",
      render: (name) => <Tag className={styles.brandTag}>{name}</Tag>,
    },
    {
      title: "Logo",
      key: "logo",
      dataIndex: "logo",
      render: (image) => {
        const url = getImageUrl2(image);

        return (
          <Image
            src={url}
            width={100}
            height={100}
            className={styles.brandImage}
          />
        );
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
            title="Xoá thương hiệu"
            description="Xác nhận xoá thương hiệu"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeBrandMutation.mutate(record.id)}
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

          <Link to={`/admin/brand/${record.id}/edit`}>
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
        <p className={styles.title}>Danh sách thương hiệu</p>

        <Link to="/admin/brand/add">
          <Button type="primary" size="large" className={styles.addButton}>
            Thêm thương hiệu
          </Button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <Table
          className={styles.customTable}
          columns={columns}
          dataSource={data}
          pagination={{ hideOnSinglePage: true }}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default ListBrand;
