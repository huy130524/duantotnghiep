import { message, Popconfirm } from "antd";
import { api } from "../../../../api/api";
import { useMutation } from "@tanstack/react-query";
import UpdateAddressModal from "./UpdateAddressModal";
import { useState } from "react";

const AddressItem = (props) => {
  const { isDefault, data, refetch } = props;

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const deleteAddressMutation = useMutation({
    mutationKey: ["DELETE_ADDRESS"],
    mutationFn: () => api.delete(`/addresses/delete/${data?.id}`),
    onSuccess: () => {
      message.success("Xoá địa chỉ thành công");
      refetch();
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });

  return (
    <>
      <div className="tw-py-5 tw-border-t tw-border-x-0 tw-border-b-0 tw-border-solid tw-border-[#cfcfcf] tw-flex tw-items-center tw-justify-between tw-gap-x-4">
        <div className="tw-text-[14px] tw-flex-1">
          <div className="tw-flex tw-items-center tw-gap-x-2">
            {isDefault && (
              <p className="tw-border tw-border-[#e30019] tw-m-0 tw-border-solid tw-rounded tw-h-7 tw-px-2 tw-text-[#e30019] tw-flex tw-items-center">
                Mặc định
              </p>
            )}

            {/* <p className="tw-text-[#111] tw-font-semibold">Hà Văn Tú</p>
          <p className="tw-text-[#535353]">|</p> */}
            <p className="tw-text-[#535353] tw-m-0">{data?.phone}</p>
          </div>

          <p className="tw-text-[#535353] tw-mt-2 tw-m-0">
            {`${data?.street}, ${data?.district}, ${data?.city}`}
          </p>
        </div>

        <div>
          <div className="tw-flex tw-items-center tw-gap-x-3 tw-justify-end tw-text-[14px] tw-mb-2 tw-text-[#1982f9]">
            <p
              className="tw-cursor-pointer tw-m-0"
              onClick={() => setOpenUpdateModal(true)}
            >
              Cập nhật
            </p>
            {!isDefault && (
              <Popconfirm
                title="Xoá địa chỉ"
                description="Bạn có chắc chắn muốn xoá địa chỉ này?"
                okText="Xoá"
                cancelText="Hủy"
                onConfirm={deleteAddressMutation.mutate}
              >
                <p className="tw-cursor-pointer tw-m-0">Xoá</p>
              </Popconfirm>
            )}
          </div>

          {/* {!isDefault && <Button>Thiết lập mặc định</Button>} */}
        </div>
      </div>

      <UpdateAddressModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onSuccess={refetch}
        id={data?.id}
      />
    </>
  );
};

export default AddressItem;
