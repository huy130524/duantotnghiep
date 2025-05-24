import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, Flex, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";

const ListSize = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_SIZE"],
    queryFn: () => api.get("/sizes"),
  });

  const removeSizeMutation = useMutation({
    mutationKey: ["REMOVE_SIZE"],
    mutationFn: (id) => api.delete("/size/delete/" + id),
    onSuccess: () => {
      message.success("Xoá size thành công");
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
      title: "Tên size",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Popconfirm
            title="Xoá size"
            description="Xác nhận xoá size"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeSizeMutation.mutate(record.id)}
          >
            <DeleteOutlined
              className={classNames(styles.icon, styles.deleteIcon)}
            />
          </Popconfirm>

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
