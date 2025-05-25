import styles from "../Product/index.module.scss";

import { Button, Flex, Table, Popconfirm, message, Modal } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import classNames from "classnames";
import { useState } from "react";

const ListContact = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const { data, refetch } = useQuery({
    queryKey: ["LIST_CONTACT"],
    queryFn: () => api.get("/contacts"),
  });

  const deleteContactMutation = useMutation({
    mutationKey: ["DELETE_CONTACT"],
    mutationFn: (id) => api.delete(`/contacts/delete/${id}`),
    onSuccess: () => {
      message.success("Xoá liên hệ thành công");
      refetch();
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleDelete = (id) => {
    deleteContactMutation.mutate(id);
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      width: 70,
      align: "center",
    },
    {
      title: "Người liên hệ",
      key: "user",
      render: (_, record) => {
        return (
          <div>
            <p className="tw-m-0 tw-font-medium">{record.fullname}</p>
            <p className="tw-m-0 tw-text-gray-500">{record.email}</p>
            <p className="tw-m-0 tw-text-gray-500">{record.phone}</p>
          </div>
        );
      },
    },
    {
      title: "Nội dung",
      key: "contact",
      dataIndex: "contact",
      width: "40%",
      render: (_, record) => {
        return (
          <div className="tw-bg-gray-50 tw-p-2 tw-rounded">
            <p className="tw-m-0 tw-line-clamp-3 tw-whitespace-pre-line">
              {record.contact}
            </p>
          </div>
        );
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "created_at",
      align: "center",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY HH:mm");
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
            title="Xoá liên hệ"
            description="Xác nhận xoá liên hệ này"
            cancelText="Huỷ"
            okText="Xác nhận"
            onConfirm={() => handleDelete(record.id)}
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

          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            className={styles.editButton}
            onClick={() => handleViewContact(record)}
          >
            Xem
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>📬 Danh sách liên hệ</p>
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
              `${range[0]}-${range[1]} của ${total} liên hệ`,
          }}
          rowKey="id"
          className={styles.customTable}
          size="large"
        />
      </div>

      <Modal
        title="Chi tiết liên hệ"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedContact && (
          <div>
            <p>
              <strong>ID:</strong> {selectedContact.id}
            </p>
            <p>
              <strong>Họ và tên:</strong> {selectedContact.fullname}
            </p>
            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedContact.phone}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {dayjs(selectedContact.created_at).format("DD/MM/YYYY HH:mm")}
            </p>
            <div>
              <strong>Nội dung:</strong>
              <div className="tw-mt-2 tw-p-3 tw-bg-gray-50 tw-rounded tw-whitespace-pre-line">
                {selectedContact.contact}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListContact;
