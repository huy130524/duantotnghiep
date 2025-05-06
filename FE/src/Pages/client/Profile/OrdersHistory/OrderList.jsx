import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils/formatPrice";

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

      <div className="tw-py-4 tw-border-b border-[#CFCFCF]">
        <div className="tw-flex tw-items-center">
          <div className="tw-p-2 tw-w-3/4 tw-flex tw-items-center tw-gap-x-2">
            <div className="tw-w-[90px] tw-h-[90px] tw-border tw-border-[#eee] tw-border-solid tw-rounded tw-overflow-hidden tw-relative">
              <img
                src="https://picsum.photos/200/300"
                alt="Product image"
                className="tw-block tw-w-full tw-h-full tw-object-cover"
              />

              <p className="tw-absolute tw-bottom-0 tw-mb-0 tw-right-0 tw-w-6 tw-h-6 tw-bg-[#ececec] tw-rounded-tl tw-flex tw-items-center tw-justify-center tw-text-[12px] tw-text-[#6d6e72] tw-font-semibold">
                x2
              </p>
            </div>

            <div>
              <p className="tw-text-[#111] tw-font-semibold tw-mb-0">
                PC GVN x AORUS MASTER (Intel i9-14900K/ VGA RTX 4090)
              </p>
            </div>
          </div>

          <div className="tw-w-1/4 tw-text-[#111] tw-text-right">
            <p className="tw-m-0">38.990.000₫</p>
            <p className="tw-line-through tw-text-[14px] tw-m-0">38.990.000₫</p>
          </div>
        </div>
      </div>

      {/* <Button className="tw-rounded tw-mt-3">Xem thêm 1 sản phẩm</Button> */}

      <div className="tw-text-right">
        <p className="tw-m-0">
          <span>Tổng tiền: </span>
          <span className="tw-text-[#e30019] tw-font-semibold">
            {formatPrice(data.total_price)}
          </span>
        </p>

        <Link
          to={`/profile/orders-history/${data.id}`}
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
