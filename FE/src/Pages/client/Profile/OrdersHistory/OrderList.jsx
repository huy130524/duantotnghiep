import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils/formatPrice";
import { getImageUrl } from "../../../../utils/image";

const OrderCard = ({ data }) => {
  return (
    <div className="tw-pt-4 tw-px-6 tw-pb-6 tw-rounded tw-bg-white [&:not(:last-child)]:tw-mb-4">
      <div className="tw-flex tw-items-center tw-justify-between tw-pb-4 tw-border-solid tw-border-x-0 tw-border-t-0 tw-border-b tw-border-[#CFCFCF]">
        <p className="tw-text-[#6d6e72] tw-text-[14px] tw-font-semibold tw-mb-0">
          {data.status}
        </p>

        <p className="tw-text-[14px] tw-text-[#111] tw-font-semibold tw-mb-0">
          #{data.code}
        </p>
      </div>

      {[...data.order_details].splice(0, 2).map((it, idx) => {
        const product = it.variant?.product;

        return (
          <div
            key={idx}
            className="tw-py-4 tw-border-b tw-border-[#CFCFCF] tw-border-solid tw-border-x-0 tw-border-t-0"
          >
            <div className="tw-flex tw-items-center">
              <div className="tw-p-2 tw-w-3/4 tw-flex tw-items-center tw-gap-x-2">
                <div className="tw-w-[90px] tw-h-[90px] tw-border tw-border-[#eee] tw-border-solid tw-rounded tw-overflow-hidden tw-relative">
                  <img
                    src={getImageUrl(it.variant?.image)}
                    alt="Product image"
                    className="tw-block tw-w-full tw-h-full tw-object-cover"
                  />

                  <p className="tw-absolute tw-bottom-0 tw-mb-0 tw-right-0 tw-w-6 tw-h-6 tw-bg-[#ececec] tw-rounded-tl tw-flex tw-items-center tw-justify-center tw-text-[12px] tw-text-[#6d6e72] tw-font-semibold">
                    x{it.quantity}
                  </p>
                </div>

                <div>
                  <p className="tw-text-[#111] tw-font-semibold tw-mb-0">
                    {product?.name}
                  </p>

                  <p className="tw-text-[14px] tw-text-[#535353] tw-mt-1 tw-mb-0">
                    Màu: {it.variant?.color?.name}
                  </p>
                  <p className="tw-text-[14px] tw-text-[#535353] tw-mb-0">
                    Size: {it.variant?.size?.name}
                  </p>
                </div>
              </div>

              <div className="tw-w-1/4 tw-text-[#111] tw-text-right">
                <p className="tw-m-0">{formatPrice(it.total_price)}</p>
                {/* <p className="tw-line-through tw-text-[14px] tw-m-0">
                  38.990.000₫
                </p> */}
              </div>
            </div>
          </div>
        );
      })}

      {/* <Button className="tw-rounded tw-mt-3">Xem thêm 1 sản phẩm</Button> */}

      <div className="tw-text-right tw-mt-3">
        <p className="tw-m-0">
          <span>Tổng tiền: </span>
          <span className="tw-text-[#e30019] tw-font-semibold">
            {formatPrice(data.total_price)}
          </span>
        </p>

        <Link
          to={`/profile/orders-history/${data.code}`}
          className="tw-border tw-border-[#1982f9] tw-border-solid tw-rounded tw-px-3 tw-h-9 tw-text-[14px] !tw-text-[#1982f9] tw-inline-flex tw-items-center tw-mt-2"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

const OrderList = ({ data }) => {
  return (
    <div className="tw-bg-[#ececec]">
      {data.map((it) => (
        <OrderCard data={it} />
      ))}
    </div>
  );
};

export default OrderList;
