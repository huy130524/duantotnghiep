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
    },
    {
      title: "Tiêu đề",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Hình ảnh",
      key: "image",
      render: (_, record) => {
        return (
          <Image
            src={getImageUrl2(record.image)}
            width={120}
            height={120}
            className="tw-object-cover"
          />
        );
      },
    },
    {
      title: "Danh mục",
      key: "category",
      render: (_, record) => {
        return record.category.name;
      },
    },
    {
      title: "Tác giả",
      key: "user",
      render: (_, record) => {
        return record.user.fullname;
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
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Link to={`/admin/blog/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách bài viết</p>

        <Link to="/admin/blog/add">
          <Button type="primary">Thêm bài viết</Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{ hideOnSinglePage: true }}
        rowKey="id"
      />
    </>
  );
};

export default ListBlog;
