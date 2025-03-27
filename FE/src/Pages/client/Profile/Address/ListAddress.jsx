import { Button, Empty } from "antd";
import AddAddressModal from "./AddressModal";
import { useState } from "react";
import AddressItem from "./AddressItem";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";

const ListAddress = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["GET_ADDRESS"],
    queryFn: () => api.get("/addresses"),
  });

  return (
    <>
      <div className="tw-px-6 tw-py-4 tw-flex tw-items-center tw-justify-between">
        <h2 className="tw-text-[24px] tw-font-semibold tw-text-[#333] tw-leading-tight">
          Thông tin tài khoản
        </h2>

        <Button
          type="primary"
          className="tw-h-9"
          onClick={() => setOpenModal(true)}
        >
          + Thêm địa chỉ mới
        </Button>
      </div>

      <div className="tw-px-6 tw-py-4">
        {data?.map((it) => (
          <AddressItem
            key={it.id}
            isDefault={it.is_default}
            data={it}
            refetch={refetch}
          />
        ))}

        {!data?.length && (
          <Empty className="mt-4" description="Chưa có địa chỉ" />
        )}
      </div>

      <AddAddressModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={refetch}
      />
    </>
  );
};

export default ListAddress;
