import { Button } from "antd";
import AddAddressModal from "./AddressModal";
import { useState } from "react";
import AddressItem from "./AddressItem";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";

const ListAddress = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data } = useQuery({
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
        <AddressItem isDefault />
        <AddressItem isDefault={false} />
        <AddressItem isDefault={false} />
      </div>

      <AddAddressModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default ListAddress;
