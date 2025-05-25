import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { Button, Flex, Image, Table, message, Popconfirm, Tag } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  StopOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { getImageUrl } from "../../../utils/image";

const ListUser = () => {
  const { data, refetch } = useQuery({
    queryKey: ["LIST_USER"],
    queryFn: () => api.get("/users"),
  });

  const removeUserMutation = useMutation({
    mutationKey: ["REMOVE_USER"],
    mutationFn: (id) => api.delete("/users/delete/" + id),
    onSuccess: () => {
      message.success("Xoá người dùng thành công");
      refetch();
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const changeStatusMutation = useMutation({
    mutationKey: ["CHANGE_USER_STATUS"],
    mutationFn: (id) => api.post(`/users/change/${id}`),
    onSuccess: () => {
      message.success("Thay đổi trạng thái tài khoản thành công");
      refetch();
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "orange";
      case "banned":
        return "red";
      default:
        return "default";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "blue";
      case "staff":
        return "purple";
      case "user":
        return "default";
      default:
        return "default";
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "staff":
        return "Nhân viên";
      case "user":
        return "Khách hàng";
      default:
        return role;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Hoạt động";
      case "inactive":
        return "Đang khóa";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 70,
      align: "center",
    },
    {
      title: "Thông tin người dùng",
      key: "user_info",
      render: (_, record) => (
        <div className={styles.userInfo}>
          {record.avatar ? (
            <Image
              src={getImageUrl(record.avatar)}
              alt="Avatar"
              className={styles.avatar}
              preview={false}
            />
          ) : (
            <div
              className={styles.avatar}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f0f0",
                color: "#999",
              }}
            >
              <UserOutlined />
            </div>
          )}
          <div className={styles.userDetails}>
            <p className={styles.userName}>{record.fullname}</p>
            <p className={styles.userEmail}>{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (phone) => phone || "Chưa cập nhật",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      ellipsis: true,
      render: (address) => address || "Chưa cập nhật",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: 120,
      align: "center",
      render: (role) => (
        <Tag
          color={getRoleColor(role)}
          className={classNames(styles.roleTag, styles[role])}
        >
          {getRoleText(role)}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 120,
      align: "center",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          className={classNames(styles.statusTag, styles[status])}
        >
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Flex align="center" justify="center" gap={8}>
          {record.status === "active" && (
            <Popconfirm
              title="Khóa tài khoản"
              description="Xác nhận khóa tài khoản này?"
              cancelText="Huỷ"
              okText="Xác nhận"
              onConfirm={() => changeStatusMutation.mutate(record.id)}
            >
              <Button
                size="small"
                icon={<StopOutlined />}
                className={styles.inactiveButton}
              >
                Khóa
              </Button>
            </Popconfirm>
          )}

          <Link to={`/admin/user/${record.id}/edit`}>
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              className={styles.editButton}
            >
              Sửa
            </Button>
          </Link>

          <Popconfirm
            title="Xoá người dùng"
            description="Xác nhận xoá người dùng này?"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => removeUserMutation.mutate(record.id)}
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>👥 Danh sách người dùng</p>

        <Link to="/admin/user/add">
          <Button type="primary" size="large" className={styles.addButton}>
            ➕ Thêm người dùng
          </Button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} người dùng`,
          }}
          rowKey="id"
          className={styles.customTable}
          size="large"
          scroll={{ x: 1200 }}
        />
      </div>
    </>
  );
};

export default ListUser;
