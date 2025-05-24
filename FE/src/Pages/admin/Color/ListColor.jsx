import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, ColorPicker, Flex, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ListColor = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_COLOR"],
    queryFn: () => api.get("/colors"),
  });

  const removeColorMutation = useMutation({
    mutationKey: ["REMOVE_COLOR"],
    mutationFn: (id) => api.delete("/color/delete/" + id),
    onSuccess: () => {
      message.success("Xoá màu thành công");
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
      title: "Tên màu",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Mã màu",
      key: "color_code",
      dataIndex: "color_code",
      render: (code) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ColorPicker value={code} disabled size="small" />
            <span className={styles.colorTag}>{code}</span>
          </div>
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
            title="Xoá màu"
            description="Xác nhận xoá màu"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeColorMutation.mutate(record.id)}
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>

          <Link to={`/admin/color/${record.id}/edit`}>
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
        <p className={styles.title}>Danh sách màu</p>

        <Link to="/admin/color/add">
          <Button type="primary" size="large" className={styles.addButton}>
            Thêm màu
          </Button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ hideOnSinglePage: true }}
          rowKey="id"
          className={styles.customTable}
        />
      </div>
    </>
  );
};

export default ListColor;
