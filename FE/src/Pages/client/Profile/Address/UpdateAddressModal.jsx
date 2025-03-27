import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Modal, Switch } from "antd";

import { FaTimes } from "react-icons/fa";
import { api } from "../../../../api/api";
import { useEffect } from "react";

const UpdateAddressModal = (props) => {
  const { open, onClose, onSuccess, id } = props;

  const [form] = Form.useForm();

  const { data } = useQuery({
    queryKey: ["GET_ADDRESS", id],
    queryFn: () => api.get(`/addresses/detail/${id}`),
    enabled: open,
  });

  const addAddressMutation = useMutation({
    mutationKey: ["UPDATE_ADDRESS"],
    mutationFn: (values) => api.post("/addresses/update/" + id, values),
    onSuccess: () => {
      message.success("Cập nhật địa chỉ thành công");
      onClose();
      onSuccess();
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      closeIcon={<FaTimes className="text-[16px]" />}
      footer={<></>}
      destroyOnClose
    >
      <div className="tw-flex tw-items-center tw-justify-between">
        <p className="tw-uppercase text-[16px] tw-font-semibold tw-text-[#333] tw-mb-0">
          Địa chỉ mới
        </p>
      </div>

      <hr className="h-[1px] bg-[#CFCFCF] tw-mt-3 tw--mx-5" />

      <Form
        layout="vertical"
        className="tw-mt-4"
        onFinish={addAddressMutation.mutate}
        form={form}
      >
        <p className="tw-font-semibold text-[16px] text-[#333] tw-mb-3">
          Thông tin khách hàng
        </p>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              pattern: /^0\d{9,10}$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
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
          <Form.Item
            className="tw-col-span-6 tw-m-0"
            name="district"
            rules={[{ required: true, message: "Vui lòng nhập quận/huyện" }]}
          >
            <Input placeholder="Quận/Huyện" size="large" />
          </Form.Item>

          <Form.Item
            className="tw-col-span-6 tw-m-0"
            name="city"
            rules={[
              { required: true, message: "Vui lòng nhập tỉnh/thành phố" },
            ]}
          >
            <Input placeholder="Tỉnh/Thành phố" size="large" />
          </Form.Item>

          <Form.Item
            className="tw-col-span-12"
            name="street"
            rules={[
              { required: true, message: "Vui lòng nhập số nhà, địa chỉ" },
            ]}
          >
            <Input placeholder="Số nhà, địa chỉ" size="large" />
          </Form.Item>
        </div>

        <p className="text-[16px] text-[#333] tw-mb-2">Địa chỉ mặc định</p>

        <Form.Item name="is_default" valuePropName="checked" noStyle>
          <Switch />
        </Form.Item>

        <Button
          htmlType="submit"
          className="tw-uppercase !tw-bg-[#e30019] tw-mt-5 !tw-text-white tw-h-[40px] tw-w-full tw-border !tw-border-[#e30019]"
        >
          Hoàn thành
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateAddressModal;
