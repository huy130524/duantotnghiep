import { useQuery } from "@tanstack/react-query";
import { Button, Empty, Flex, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { IoMdAdd } from "react-icons/io";

const AddressItem = ({ data, isChecked, onCheck }) => {
  return (
    <div
      onClick={onCheck}
      className="tw-flex tw-py-4 tw-gap-2 [&:not(:last-child)]:tw-border-b [&:not(:last-child)]:tw-border-solid tw-border-t-0 tw-border-x-0 tw-border-gray-300"
    >
      <Radio checked={isChecked} />

      <div className="tw-flex-1">
        <div className="tw-flex tw-gap-2 tw-items-center">
          {/* <p className="tw-font-semibold tw-text-base">{data.name}</p> */}

          {/* <p className="tw-h-5 tw-bg-gray-300 tw-w-[1px] tw-mb-0"></p> */}

          <p className="tw-text-sm tw-text-[#0000008a] tw-m-0">{data.phone}</p>
        </div>

        <p className="tw-text-sm tw-text-[#0000008a] tw-mt-2 tw-m-0">
          {data.street}, {data.district}, {data.city}
        </p>

        {!!data.is_default && (
          <p className="tw-text-xs tw-border tw-border-[#dc143c] tw-border-solid tw-inline-block tw-px-1.5 tw-py-1 tw-text-[#dc143c] tw-mt-2">
            Mặc định
          </p>
        )}
      </div>
    </div>
  );
};

const SelectAddressModal = ({
  children,
  setSelectedAddress,
  selectedAddress,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedAdd, setSelectedAdd] = useState(null);

  useEffect(() => {
    setSelectedAdd(selectedAddress);
  }, [selectedAddress, visible]);

  const { data: address } = useQuery({
    queryKey: ["GET_ADDRESS"],
    queryFn: () => api.get("/addresses"),
  });

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const onOk = () => {
    setSelectedAddress(selectedAdd);

    onClose();
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        open={visible}
        onCancel={onClose}
        centered
        title={
          <Flex justify="space-between">
            <p className="tw-text-xl tw-font-semibold">Địa Chỉ Của Tôi</p>

            <Button
              icon={<IoMdAdd size={16} />}
              onClick={() =>
                window.open(
                  "/profile/address",
                  "name",
                  "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=4000,height=4000"
                )
              }
            >
              Thêm địa chỉ mới
            </Button>
          </Flex>
        }
        footer={null}
        closeIcon={null}
        destroyOnClose
      >
        <hr className="-tw-mx-6 tw-border-gray-400" />

        {address?.length > 0 ? (
          <div className="tw-max-h-[40vh] tw-overflow-y-auto">
            {address?.map((it) => {
              const isChecked = it.id === selectedAdd?.id;

              return (
                <AddressItem
                  onCheck={() => setSelectedAdd(it)}
                  isChecked={isChecked}
                  key={it.id}
                  data={it}
                />
              );
            })}
          </div>
        ) : (
          <Empty description="Chưa có địa chỉ nào" className="tw-my-20" />
        )}

        <hr className="-tw-mx-6 tw-border-gray-400" />
        <div className="tw-flex tw-items-center tw-justify-end tw-gap-3">
          <Button
            size="large"
            onClick={onClose}
            className="tw-rounded-none tw-min-w-32 tw-text-sm tw-uppercase hover:!tw-text-[#dc143c] hover:!tw-border-[#dc143c]"
          >
            Huỷ
          </Button>

          <Button
            size="large"
            type="primary"
            className="tw-rounded-none tw-min-w-32 tw-text-sm tw-uppercase !tw-bg-[#dc143c] hover:!tw-bg-opacity-60"
            onClick={onOk}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SelectAddressModal;
