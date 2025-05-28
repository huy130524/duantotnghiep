import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../../api/api";
import { Button, Flex, message, Popconfirm, Spin } from "antd";
import dayjs from "dayjs";
import { formatPrice } from "../../../../utils/formatPrice";
import { useMemo } from "react";
import { getImageUrl } from "../../../../utils/image";
import ReviewButton from "../../../../components/ReviewButton";

const OrderHistoryDetail = () => {
  const params = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["GET_ORDER_DETAIL", params?.id],
    queryFn: async () => {
      const r = await api.get(`/profile/orders-detail/${params.id}`);

      return r;
    },
  });

  const cancelOrderMutation = useMutation({
    mutationKey: ["CANCEL_ORDER"],
    mutationFn: () => api.post(`/orders/${data.id}/cancel`),
    onSuccess: () => {
      message.success("Huỷ đơn hàng thành công");

      refetch();
    },
  });

  const confirmReceivedMutation = useMutation({
    mutationKey: ["CONFIRM_RECEIVED_ORDER"],
    mutationFn: () => api.post(`/order/${data.id}/confirm`),
    onSuccess: () => {
      message.success("Đã xác nhận đã nhận hàng");

      refetch();
    },
  });

  const totalPrice = useMemo(() => {
    if (!data) return 0;
    return data.order_details.reduce((acc, it) => {
      return acc + it.total_price;
    }, 0);
  }, [data]);

  if (!data) return <Spin />;

  return (
    <>
      <div className="tw-px-6 tw-pt-4 tw-flex tw-items-center tw-justify-between tw-gap-x-2">
        <p className="tw-text-[24px] tw-font-semibold tw-text-[#333] tw-mb-0">
          Chi tiết đơn hàng #{data.code}
        </p>

        <p className="tw-text-[#111] tw-mb-0">
          Đặt lúc: {dayjs(data.created_at).format("HH:mm, DD.MM.YYYY")}
        </p>
      </div>

      <Flex className="tw-px-6" justify="space-between" align="center">
        <p className="tw-text-[#FF7A00] tw-mb-0 tw-text-[24px] tw-font-semibold">
          {data.status}
        </p>

        {data.status === "Chờ xác nhận" && (
          <Popconfirm
            title="Huỷ đơn hàng"
            description="Bạn chắc chắn muốn huỷ đơn hàng này?"
            okText="Huỷ"
            cancelText="Không"
            onConfirm={cancelOrderMutation.mutate}
          >
            <Button danger type="primary">
              Huỷ ĐH
            </Button>
          </Popconfirm>
        )}

        {data.status === "Xác nhận đã giao" && (
          <Popconfirm
            title="Đã nhận hàng"
            description="Bạn chắc chắn đã nhận đơn hàng này?"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={confirmReceivedMutation.mutate}
          >
            <Button type="primary">Đã nhận hàng</Button>
          </Popconfirm>
        )}

        {!data?.is_review && data.status === "Đã giao hàng" && (
          <ReviewButton
            orderId={data.id}
            orderDetails={data.order_details}
            refetch={refetch}
          />
        )}
      </Flex>

      <div className="tw-px-6 tw-py-4">
        <div className="tw-grid tw-grid-cols-12 tw-gap-4">
          <div className="tw-col-span-8 tw-rounded tw-border tw-border-[#CFCFCF] tw-border-solid tw-pt-3 tw-px-4 tw-pb-4">
            <div className="tw-flex tw-items-center tw-gap-x-3 tw-mb-3">
              <img src="/svg/customer-info.svg" alt="Icon" className="tw-h-7" />

              <p className="tw-text-[#333] tw-font-semibold tw-mb-0">
                Thông tin khách hàng
              </p>
            </div>

            <div className="tw-flex tw-items-center tw-mb-3 tw-gap-x-3">
              <p className="tw-w-1/3 tw-mb-0">Người nhận:</p>
              <p className="tw-flex-1 tw-mb-0">
                {data.fullname} - {data.phone}
              </p>
            </div>

            <div className="tw-flex tw-items-center tw-mb-3 tw-gap-x-3">
              <p className="tw-w-1/3 tw-mb-0">Địa chỉ nhận hàng:</p>
              <p className="tw-flex-1 tw-mb-0">{data.address}</p>
            </div>

            {data?.confirmed_delivered_at && (
              <div className="tw-flex tw-items-center tw-mb-3 tw-gap-x-3">
                <p className="tw-w-1/3 tw-mb-0">Thời gian giao hàng:</p>
                <p className="tw-flex-1 tw-mb-0">
                  {dayjs(data.confirmed_delivered_at).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="tw-col-span-4 tw-pt-3 tw-px-4 tw-pb-4 tw-border tw-border-[#CFCFCF] tw-border-solid tw-rounded">
            <div className="tw-flex tw-items-center tw-gap-x-3 tw-mb-3">
              <img
                src="/svg/payment-method.svg"
                alt="Icon"
                className="tw-h-7"
              />

              <p className="tw-text-[#333] tw-font-semibold tw-mb-0">
                Hình thức thanh toán
              </p>
            </div>

            <p className="tw-text-[#ff7300] tw-mb-0">{data.payment}</p>
          </div>
        </div>

        <div className="tw-pt-3 tw-px-4 tw-pb-4 tw-mt-4 tw-border tw-border-[#CFCFCF] tw-border-solid tw-rounded">
          <div className="tw-flex tw-items-center tw-gap-x-3 tw-mb-3">
            <img src="/svg/product-info.svg" alt="Icon" className="tw-h-7" />

            <p className="tw-text-[#333] tw-font-semibold tw-mb-0">
              Thông tin sản phẩm
            </p>
          </div>

          {data.order_details.map((it, idx) => {
            const product = it.variant?.product;

            return (
              <div className="tw-p-2 tw-flex tw-gap-x-4" key={idx}>
                <div className="tw-w-3/4 tw-flex tw-gap-x-3 tw-items-center">
                  <img
                    src={getImageUrl(it.variant?.image)}
                    alt="Product image"
                    className="tw-w-[60px] tw-h-[60px] tw-object-cover"
                  />

                  <div>
                    <p className="tw-text-[#111] tw-mb-0">{product?.name}</p>

                    <p className="tw-text-[14px] tw-text-[#535353] tw-mt-1 tw-mb-0">
                      Màu: {it.variant?.color?.name}
                    </p>
                    <p className="tw-text-[14px] tw-text-[#535353] tw-mb-0">
                      Size: {it.variant?.size?.name}
                    </p>

                    <p className="tw-text-[14px] tw-text-[#535353] tw-mt-1 tw-mb-0">
                      Số lượng: {it.quantity}
                    </p>
                  </div>
                </div>

                <div className="tw-w-1/4">
                  <p className="tw-text-[#e30019] tw-text-right tw-mb-0">
                    {formatPrice(it.total_price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="tw-ml-[50%] tw-mt-4">
          <div className="tw-flex tw-items-center tw-mb-3">
            <p className="tw-w-1/2 tw-mb-0">Giá tạm tính:</p>
            <p className="tw-w-1/2 tw-text-right tw-mb-0">
              {formatPrice(totalPrice)}
            </p>
          </div>

          {data.voucher_code && (
            <div className="tw-flex tw-items-center tw-mb-3">
              <p className="tw-w-1/2 tw-mb-0">Giảm giá trên đơn hàng:</p>
              <p className="tw-w-1/2 tw-text-right tw-mb-0">
                - {formatPrice(data.discount)}
              </p>
            </div>
          )}

          <div className="tw-flex tw-items-center tw-mb-3">
            <p className="tw-w-1/2 tw-mb-0">Tổng tiền:</p>
            <p className="tw-w-1/2 tw-text-right tw-mb-0">
              {formatPrice(data.total_price)}
            </p>
          </div>
        </div>

        <div className="tw-my-28 tw-text-center">
          <Link
            to="/profile/orders-history"
            className="tw-inline-flex tw-items-center tw-px-6 !tw-text-white tw-bg-[#1982f9] tw-rounded tw-h-[50px]"
          >
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryDetail;
