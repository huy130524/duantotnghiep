import { useMemo, useState } from "react";
import styles from "./index.module.css";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";

const TABS = [
  {
    id: 1,
    label: "Tất cả",
    status: "Tất cả",
  },
  {
    id: 2,
    label: "Chờ xác nhận",
    status: "Chờ xác nhận",
  },
  {
    id: 3,
    label: "Đã xác nhận",
    status: "Đã xác nhận",
  },
  {
    id: 4,
    label: "Đang chuẩn bị",
    status: "Đang chuẩn bị hàng",
  },
  {
    id: 5,
    label: "Đang giao",
    status: "Đang giao hàng",
  },
  {
    id: 6,
    label: "Đã giao",
    status: "Đã giao hàng",
  },
  {
    id: 7,
    label: "Huỷ",
    status: "Đơn hàng đã hủy",
  },
];

const OrdersHistory = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].status);

  const { data } = useQuery({
    queryKey: ["ORDER_HISTORY"],
    queryFn: () => api.get("/admin-orders"),
  });

  const order = useMemo(() => {
    const order = {
      "Tất cả": data,
    };

    if (!data) return order;

    for (const item of data) {
      const status = item.status;

      if (order[status]) {
        order[status].push(item);
      } else {
        order[status] = [item];
      }
    }

    return order;
  }, [data]);

  return (
    <>
      <h2 className="tw-text-[24px] tw-font-semibold tw-px-6 tw-py-4 tw-text-[#333] tw-leading-tight">
        Quản lý đơn hàng
      </h2>

      {/* tab */}
      <div className="tw-flex tw-items-center tw-justify-between tw-mt-3 tw-overflow-x-auto">
        {TABS.map((it, idx) => {
          const total = order?.[it.status]?.length || 0;

          return (
            <p
              key={idx}
              className={`${styles.tabItem} ${
                activeTab === it.status && styles.active
              }`}
              onClick={() => setActiveTab(it.status)}
            >
              <span>{it.label}</span>

              {total > 0 && (
                <span className="tw-text-[#ff3c53]"> ({total})</span>
              )}
            </p>
          );
        })}
      </div>

      <div className="tw-h-2 tw-bg-gray-200"></div>

      {/* not found */}
      {order?.[activeTab]?.length > 0 ? (
        <OrderList data={order[activeTab]} />
      ) : (
        <div className="tw-py-6">
          <Empty
            description={
              <p className="tw-text-[#111]">Quý khách chưa có đơn hàng nào.</p>
            }
          />

          <div className="tw-text-center tw-mt-4">
            <Link
              to="/"
              className="tw-bg-[#e30019] tw-rounded tw-h-[40px] tw-inline-flex !tw-text-white tw-items-center tw-px-3"
            >
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersHistory;
