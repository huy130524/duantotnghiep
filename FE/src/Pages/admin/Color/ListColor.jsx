import styles from "./index.module.scss";

import { Link } from "react-router-dom";

import { Button, ColorPicker, Flex, Table, message, Popconfirm } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";

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
        return <ColorPicker value={code} disabled />;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Popconfirm
            title="Xoá màu"
            description="Xác nhận xoá màu"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeColorMutation.mutate(record.id)}
          >
            <DeleteOutlined
              className={classNames(styles.icon, styles.deleteIcon)}
            />
          </Popconfirm>

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
