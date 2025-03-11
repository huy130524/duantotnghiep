import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined } from "@ant-design/icons";

const ListSize = () => {
  const { data } = useQuery({
    queryKey: ["LIST_SIZE"],
    queryFn: () => api.get("/sizes"),
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Tên size",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Link to={`/admin/size/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách size</p>

        <Link to="/admin/size/add">
          <Button type="primary">Thêm size</Button>
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

export default ListSize;
