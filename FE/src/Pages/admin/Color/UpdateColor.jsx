import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Button, ColorPicker, Form, Input, message } from "antd";

import styles from "./index.module.scss";
import { useEffect } from "react";

const UpdateColor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const getColorMutation = useMutation({
    mutationKey: ["GET_COLOR", id],
    mutationFn: () => api.get("/color/detail/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        name: r.name,
        code: r.color_code,
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_COLOR"],
    mutationFn: (data) => api.post("/color/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật màu thành công");

      navigate("/admin/color");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getColorMutation.mutate();
  }, []);

  const onSubmit = (values) => {
    console.log("🚀 352 ~ onSubmit ~ values:", values);
    mutate({
      name: values.name,
      color_code:
        typeof values.code === "string"
          ? values.code
          : values.code.toHexString(),
    });
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Cập nhật màu</p>

        <Link to="/admin/category">
          <Button type="primary">Danh sách màu</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit} form={form}>
        <Form.Item
          name="name"
          label="Tên màu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên màu",
            },
          ]}
        >
          <Input placeholder="Nhập tên màu" />
        </Form.Item>

        <Form.Item
          name="code"
          label="Mã màu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn mã màu",
            },
          ]}
        >
          <ColorPicker showText />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Cập nhật màu
        </Button>
      </Form>
    </>
  );
};

export default UpdateColor;
