import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Image, message, Popconfirm, Table } from "antd";
import { getImageUrl2 } from "../../../utils/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";

const ListBanner = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_BANNER"],
    queryFn: () => api.get("/banners"),
  });

  const removeBannerMutation = useMutation({
    mutationKey: ["REMOVE_BANNER"],
    mutationFn: (id) => api.delete("/banner/delete/" + id),
    onSuccess: () => {
      message.success("Xoá banner thành công");
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
      title: "Tên banner",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Ảnh",
      key: "image",
      dataIndex: "image",
      render: (image) => {
        const url = getImageUrl2(image.slice(1));

        return (
          <Image src={url} width={100} height={100} className={styles.image} />
        );
      },
    },
    {
      title: "Link banner",
      key: "link",
      dataIndex: "link",
      render: (link) => {
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Popconfirm
            title="Xoá banner?"
            description="Xác nhận xoá banner"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeBannerMutation.mutate(record.id)}
          >
            <DeleteOutlined
              className={classNames(styles.icon, styles.deleteIcon)}
            />
          </Popconfirm>

          <Link to={`/admin/banner/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách banner</p>

        <Link to="/admin/banner/add">
          <Button type="primary">Thêm banner</Button>
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

export default ListBanner;
