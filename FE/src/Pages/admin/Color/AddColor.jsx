import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, ColorPicker, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

const AddColor = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_COLOR"],
    mutationFn: (data) => api.post("/color/add", data),
    onSuccess: () => {
      message.success("Thêm màu thành công");

      navigate("/admin/color");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = (values) => {
    mutate({
      name: values.name,
      color_code: values.code.toHexString(),
    });
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm màu</p>

        <Link to="/admin/color">
          <Button type="primary">Danh sách màu</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit}>
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
          Thêm màu
        </Button>
      </Form>
    </>
  );
};

export default AddColor;
