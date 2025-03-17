import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

const AddCoupon = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_COUPON"],
    mutationFn: (data) => api.post("/coupon/add", data),
    onSuccess: () => {
      message.success("Thêm coupon thành công");

      navigate("/admin/coupon");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = ({ dateRange, ...values }) => {
    mutate({
      ...values,
      start_date: dateRange[0].toISOString(),
      end_date: dateRange[1].toISOString(),
    });
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm coupon</p>

        <Link to="/admin/coupon">
          <Button type="primary">Danh sách coupon</Button>
        </Link>
      </div>

      <Form
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ is_active: true }}
      >
        <Form.Item
          name="code"
          label="Mã giảm giá"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã giảm giá",
            },
            {
              pattern: /^[a-zA-Z0-9]*$/,
              message: "Mã giảm giá không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập mã giảm giá" />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Giá trị giảm giá"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá trị giảm giá",
            },
          ]}
        >
          <InputNumber placeholder="Nhập giá trị giảm giá" />
        </Form.Item>

        <Form.Item
          label="Loại giảm giá"
          name="discount_type"
          rules={[{ required: true, message: "Vui lòng chọn loại giảm giá" }]}
        >
          <Select
            options={[
              { label: "Phần trăm", value: "percentage" },
              { label: "Số tiền", value: "fixed" },
            ]}
            placeholder="Chọn loại giảm giá"
          />
        </Form.Item>

        <Flex gap="12px">
          <div style={{ width: "50%" }}>
            <Form.Item
              name="usage_limit"
              label="Số lần sử dụng"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lần sử dụng",
                },
              ]}
              className="!w-1/2"
            >
              <InputNumber
                placeholder="Nhập số lần sử dụng"
                className="w-full"
              />
            </Form.Item>
          </div>

          <div style={{ width: "50%" }}>
            <Form.Item
              name="usage_limit_per_user"
              label="Số lần sử dụng/người dùng"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lần sử dụng",
                },
              ]}
            >
              <InputNumber
                placeholder="Nhập số lần sử dụng"
                className="w-full"
              />
            </Form.Item>
          </div>
        </Flex>

        <Flex gap="12px">
          <div style={{ width: "50%" }}>
            <Form.Item
              name="minimum_amount"
              label="Giá trị đơn hàng tối thiểu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá trị đơn hàng tối thiểu",
                },
              ]}
            >
              <InputNumber placeholder="Nhập giá trị đơn hàng tối thiểu" />
            </Form.Item>
          </div>

          <div style={{ width: "50%" }}>
            <Form.Item
              name="maximum_amount"
              label="Giảm tối đa"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giảm tối đa",
                },
              ]}
            >
              <InputNumber placeholder="Nhập giá trị giảm tối đa" />
            </Form.Item>
          </div>
        </Flex>

        <Form.Item
          name="dateRange"
          label="Thời gian áp dụng"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thời gian áp dụng",
            },
          ]}
        >
          <DatePicker.RangePicker
            placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
            showTime
            format="DD/MM/YYYY HH:mm:ss"
          />
        </Form.Item>

        <Form.Item name="is_active" label="Kích hoạt">
          <Switch />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Thêm coupon
        </Button>
      </Form>
    </>
  );
};

export default AddCoupon;
