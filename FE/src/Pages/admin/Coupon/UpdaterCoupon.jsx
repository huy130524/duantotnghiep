import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Switch,
} from "antd";

import styles from "./index.module.scss";
import { useEffect } from "react";
import dayjs from "dayjs";

const UpdateCoupon = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const getCouponMutation = useMutation({
    mutationKey: ["GET_COUPON", id],
    mutationFn: () => api.get("/coupon/detail/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        code: r.code,
        discount: r.discount,
        discount_type: r.discount_type,
        usage_limit: r.usage_limit,
        usage_limit_per_user: r.usage_limit_per_user,
        minimum_amount: r.minimum_amount,
        maximum_amount: r.maximum_amount,
        dateRange: [dayjs(r.start_date), dayjs(r.end_date)],
        is_active: r.is_active,
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_COUPON"],
    mutationFn: (data) => api.post("/coupon/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật coupon thành công");

      navigate("/admin/coupon");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getCouponMutation.mutate();
  }, []);

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
        <p className={styles.updateTitle}>📝 Cập nhật mã giảm giá</p>

        <Link to="/admin/coupon">
          <Button type="primary" size="large" className={styles.addButton}>
            📋 Danh sách mã giảm giá
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>

            <div className={styles.formGrid}>
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
                <Input placeholder="Nhập mã giảm giá" size="large" />
              </Form.Item>

              <Form.Item
                label="Loại giảm giá"
                name="discount_type"
                rules={[
                  { required: true, message: "Vui lòng chọn loại giảm giá" },
                ]}
              >
                <Select
                  options={[
                    { label: "Phần trăm", value: "percentage" },
                    { label: "Số tiền", value: "fixed" },
                  ]}
                  placeholder="Chọn loại giảm giá"
                  size="large"
                />
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
                <InputNumber
                  placeholder="Nhập giá trị giảm giá"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="is_active"
                label="Kích hoạt"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Giới hạn sử dụng</h3>

            <div className={styles.formGrid}>
              <Form.Item
                name="usage_limit"
                label="Số lần sử dụng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lần sử dụng",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập số lần sử dụng"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>

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
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Điều kiện áp dụng</h3>

            <div className={styles.formGrid}>
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
                <InputNumber
                  placeholder="Nhập giá trị đơn hàng tối thiểu"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>

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
                <InputNumber
                  placeholder="Nhập giá trị giảm tối đa"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="dateRange"
              label="Thời gian áp dụng"
              className={styles.fullWidth}
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
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isPending}
              loading={isPending}
              size="large"
              className={styles.submitButton}
            >
              {isPending ? "Đang xử lý..." : "💾 Cập nhật mã giảm giá"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateCoupon;
