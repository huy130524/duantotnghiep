import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, message, Popconfirm, Spin, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { formatPrice } from "../../../utils/formatPrice";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import styles from "./index.module.scss";
import { useMemo } from "react";

const ConfirmPopup = ({ children, onConfirm }) => {
  return (
    <Popconfirm
      title="Cập nhật trạng thái ĐH"
      description="Xác nhận cập nhật trạng thái ĐH?"
      onConfirm={onConfirm}
    >
      <span>{children}</span>
    </Popconfirm>
  );
};

const OrderDetail = () => {
  const params = useParams();
  const orderId = params.id;

  const { data, refetch } = useQuery({
    queryKey: ["ORDER_DETAIL", params?.id],
    queryFn: async () => {
      const r = await api.get(`/admin-orders/detail/${params.id}`);

      return r;
    },
  });

  const totalPrice = useMemo(() => {
    return data?.order_details.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [data]);

  const updateStatusMutation = useMutation({
    mutationKey: ["UPDATE_ORDER_STATUS", orderId],
    mutationFn: (status) => {
      return api.post(`/admin-order-status-update/${orderId}`, { status });
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái đơn hàng thành công");
      refetch();
    },
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      render: (_, __, index) => (
        <span className={styles.indexNumber}>{++index}</span>
      ),
    },
    {
      title: "Sản phẩm",
      key: "product",
      render: (_, record) => {
        return (
          <div className={styles.productInfo}>
            <p className="tw-mb-1 tw-font-semibold tw-text-gray-800">
              {record.variant?.product?.name}
            </p>
            <div className={styles.productVariants}>
              <Tag color="blue" className={styles.variantTag}>
                {record.variant?.color?.name}
              </Tag>
              <Tag color="green" className={styles.variantTag}>
                Size: {record.variant?.size?.name}
              </Tag>
            </div>
          </div>
        );
      },
    },
    {
      title: "Đơn giá",
      key: "price",
      dataIndex: "price",
      align: "right",
      render: (price) => (
        <span className={styles.priceText}>{formatPrice(price)}</span>
      ),
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
      align: "center",
      render: (quantity) => (
        <span className={styles.quantityBadge}>×{quantity}</span>
      ),
    },
    {
      title: "Thành tiền",
      key: "total_price",
      dataIndex: "total_price",
      align: "right",
      render: (totalPrice) => (
        <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
      ),
    },
  ];

  const updateOrderStatus = async ({ status }) => {
    updateStatusMutation.mutate(status);
  };

  const renderActButton = () => {
    if (!data) return;

    switch (data.status) {
      case "Chờ xác nhận": {
        return (
          <div className={styles.actionButtons}>
            <ConfirmPopup
              onConfirm={() => updateOrderStatus({ status: "Đơn hàng đã hủy" })}
            >
              <Button
                danger
                size="large"
                icon={<ClockCircleOutlined />}
                className={styles.cancelButton}
              >
                Huỷ đơn hàng
              </Button>
            </ConfirmPopup>

            <ConfirmPopup
              onConfirm={() => updateOrderStatus({ status: "Đã xác nhận" })}
            >
              <Button
                type="primary"
                size="large"
                icon={<CheckCircleOutlined />}
                className={styles.confirmButton}
              >
                Xác nhận đơn hàng
              </Button>
            </ConfirmPopup>
          </div>
        );
      }

      case "Đã xác nhận": {
        return (
          <ConfirmPopup
            onConfirm={() =>
              updateOrderStatus({ status: "Đang chuẩn bị hàng" })
            }
          >
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className={styles.prepareButton}
            >
              Chuẩn bị hàng
            </Button>
          </ConfirmPopup>
        );
      }

      case "Đang chuẩn bị hàng": {
        return (
          <ConfirmPopup
            onConfirm={() => updateOrderStatus({ status: "Đang giao hàng" })}
          >
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              className={styles.deliveryButton}
            >
              Giao hàng
            </Button>
          </ConfirmPopup>
        );
      }

      case "Đang giao hàng": {
        return (
          <ConfirmPopup
            onConfirm={() => updateOrderStatus({ status: "Xác nhận đã giao" })}
          >
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              className={styles.completeButton}
            >
              Xác nhận đã giao
            </Button>
          </ConfirmPopup>
        );
      }

      default:
        return "";
    }
  };

  if (!data) return <Spin />;

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>📋 Chi tiết đơn hàng #{data?.code}</p>

        {renderActButton()}
      </div>

      <div className={styles.customerInfoCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>📞 Thông tin khách hàng</h3>
        </div>
        <div className={styles.cardContent}>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <UserOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>Tên người nhận:</label>
                  <span className={styles.infoValue}>{data?.fullname}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <MailOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>Email:</label>
                  <span className={styles.infoValue}>{data?.email}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <PhoneOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>Số điện thoại:</label>
                  <span className={styles.infoValue}>{data?.phone}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <HomeOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>Địa chỉ:</label>
                  <span className={styles.infoValue}>{data?.address}</span>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <CreditCardOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>
                    Phương thức thanh toán:
                  </label>
                  <span className={styles.paymentTag}>{data?.payment}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <ClockCircleOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>
                    Trạng thái đơn hàng:
                  </label>
                  <Tag
                    color={
                      data?.status === "Đơn hàng đã hủy"
                        ? "red"
                        : data?.status === "Đã giao hàng"
                        ? "green"
                        : data?.status === "Đang giao hàng"
                        ? "blue"
                        : data?.status === "Đã xác nhận"
                        ? "orange"
                        : "default"
                    }
                    className={styles.statusTag}
                  >
                    {data?.status}
                  </Tag>
                </div>
              </div>

              <div className={styles.infoItem}>
                <CheckCircleOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>
                    Trạng thái thanh toán:
                  </label>
                  <Tag
                    color={
                      data?.payment_status === "Đã thanh toán"
                        ? "green"
                        : "orange"
                    }
                    className={styles.paymentStatusTag}
                  >
                    {data?.payment_status}
                  </Tag>
                </div>
              </div>

              <div className={styles.infoItem}>
                <ClockCircleOutlined className={styles.infoIcon} />
                <div>
                  <label className={styles.infoLabel}>
                    Thời gian đặt hàng:
                  </label>
                  <div className={styles.dateInfo}>
                    <span className={styles.dateValue}>
                      {dayjs(data?.created_at).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productsSection}>
        <h3 className={styles.sectionTitle}>🛍️ Danh sách sản phẩm</h3>

        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={data?.order_details}
            rowKey="id"
            scroll={{ x: 900 }}
            pagination={false}
            className={styles.customTable}
            size="large"
          />
        </div>
      </div>

      <div className={styles.orderSummary}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>💰 Tổng kết đơn hàng</h3>

          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Tạm tính:</span>
              <span className={styles.summaryValue}>
                {formatPrice(totalPrice)}
              </span>
            </div>

            {data?.voucher_code && (
              <>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Mã giảm giá:</span>
                  <span className={styles.voucherCode}>
                    {data?.voucher_code}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Giảm giá:</span>
                  <span className={styles.discountValue}>
                    -{formatPrice(data?.discount)}
                  </span>
                </div>
              </>
            )}

            <div className={styles.summaryDivider}></div>

            <div className={styles.summaryRowTotal}>
              <span className={styles.totalLabel}>Tổng thanh toán:</span>
              <span className={styles.totalValue}>
                {formatPrice(data?.total_price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
