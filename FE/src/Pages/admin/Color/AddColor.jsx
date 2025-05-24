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
          <Button type="primary" size="large" className={styles.navButton}>
            Danh sách màu
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form layout="vertical" onFinish={onSubmit}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin màu</h3>

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
              <Input placeholder="Nhập tên màu" size="large" />
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
              <ColorPicker showText size="large" />
            </Form.Item>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            disabled={isPending}
            loading={isPending}
            className={styles.submitButton}
            size="large"
          >
            Thêm màu
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddColor;
