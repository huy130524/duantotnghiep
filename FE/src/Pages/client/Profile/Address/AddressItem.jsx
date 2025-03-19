import { Button } from "antd";

const AddressItem = (props) => {
  const { isDefault } = props;

  return (
    <div className="tw-py-5 tw-border-t tw-border-x-0 tw-border-b-0 tw-border-solid tw-border-[#cfcfcf] tw-flex tw-items-center tw-justify-between tw-gap-x-4">
      <div className="tw-text-[14px] tw-flex-1">
        <div className="tw-flex tw-items-center tw-gap-x-2">
          {isDefault && (
            <p className="tw-border tw-border-[#e30019] tw-border-solid tw-rounded tw-h-7 tw-px-2 tw-text-[#e30019] tw-flex tw-items-center">
              Mặc định
            </p>
          )}

          <p className="tw-text-[#111] tw-font-semibold">Hà Văn Tú</p>
          <p className="tw-text-[#535353]">|</p>
          <p className="tw-text-[#535353]">0983983983</p>
        </div>

        <p className="tw-text-[#535353] tw-mt-2">
          ĐƠN TEST, Xã An Phú Tây, Huyện Bình Chánh, Hồ Chí Minh, Vietnam
        </p>
      </div>

      <div>
        <div className="tw-flex tw-items-center tw-gap-x-3 tw-justify-end tw-text-[14px] tw-mb-2 tw-text-[#1982f9]">
          <p className="tw-cursor-pointer">Cập nhật</p>
          {!isDefault && <p className="tw-cursor-pointer">Xoá</p>}
        </div>

        {!isDefault && <Button>Thiết lập mặc định</Button>}
      </div>
    </div>
  );
};

export default AddressItem;
