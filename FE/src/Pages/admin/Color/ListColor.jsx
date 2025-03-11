import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, ColorPicker, Flex, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined } from "@ant-design/icons";

const ListColor = () => {
  const { data } = useQuery({
    queryKey: ["LIST_COLOR"],
    queryFn: () => api.get("/colors"),
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Tên màu",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Mã màu",
      key: "color_code",
      dataIndex: "color_code",
      render: (code) => {
        return <ColorPicker value={code} disabled />;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Link to={`/admin/color/${record.id}/edit`}>
            <EditOutlined className={styles.icon} />
          </Link>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Danh sách màu</p>

        <Link to="/admin/color/add">
          <Button type="primary">Thêm màu</Button>
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

export default ListColor;
