import { Button, Form, Input, Modal, Select } from "antd";

import { FaTimes } from "react-icons/fa";

const AddAddressModal = (props) => {
  const { open, onClose } = props;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      closeIcon={<FaTimes className="text-[16px]" />}
      footer={<></>}
    >
      <div className="tw-flex tw-items-center tw-justify-between">
        <p className="tw-uppercase text-[16px] tw-font-semibold text-[#333]">
          Địa chỉ mới
        </p>
      </div>

      <hr className="h-[1px] bg-[#CFCFCF] tw-mt-3 tw--mx-5" />

      <Form layout="vertical" className="tw-mt-4">
        <p className="tw-font-semibold text-[16px] text-[#333] tw-mb-3">
          Thông tin khách hàng
        </p>

        <Form.Item>
          <Input
            placeholder="Nhập Họ Tên"
            className="tw-rounded"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Input
            placeholder="Nhập Số điện thoại"
            className="tw-rounded"
            size="large"
          />
        </Form.Item>

        <p className="tw-font-semibold text-[16px] text-[#333] tw-mb-3">
          Địa chỉ
        </p>

        <div className="tw-grid tw-grid-cols-12 tw-gap-3">
          <Form.Item className="tw-col-span-6 tw-m-0">
            <Select
              placeholder="Chọn Tỉnh/Thành phố"
              size="large"
              options={[
                {
                  label: "Hà Nội",
                  value: 1,
                },
              ]}
            />
          </Form.Item>

          <Form.Item className="tw-col-span-6 tw-m-0">
            <Select
              placeholder="Chọn Quận/Huyện"
              size="large"
              options={[
                {
                  label: "Hà Nội",
                  value: 1,
                },
              ]}
            />
          </Form.Item>

          <Form.Item className="tw-col-span-6">
            <Select
              placeholder="Chọn Xã/Phường"
              size="large"
              options={[
                {
                  label: "Hà Nội",
                  value: 1,
                },
              ]}
            />
          </Form.Item>

          <Form.Item className="tw-col-span-6">
            <Input placeholder="Số nhà, địa chỉ" size="large" />
          </Form.Item>
        </div>

        <p className="text-[16px] text-[#333] tw-mb-3">Loại địa chỉ</p>

        <div className="tw-flex tw-gap-x-3">
          <p className="h-[40px] tw-px-3 tw-rounded text-[#535353] tw-border border-[#cfcfcf] text-[16px] tw-flex tw-items-center tw-cursor-pointer">
            Văn phòng
          </p>

          <p className="h-[40px] tw-px-3 tw-rounded bg-[#FFEDED] text-[#E30019] tw-border border-[#E30019] text-[16px] tw-flex tw-items-center tw-cursor-pointer">
            Nhà riêng
          </p>
        </div>

        <Button className="tw-uppercase bg-[#e30019] tw-mt-5 tw-text-white h-[40px] tw-w-full tw-border border-[#e30019]">
          Hoàn thành
        </Button>
      </Form>
    </Modal>
  );
};

AddAddressModal.propTypes = {
  open: Boolean,
  onClose: Function,
};

export default AddAddressModal;
