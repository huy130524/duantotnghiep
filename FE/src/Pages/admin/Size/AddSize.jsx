import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

const AddSize = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_SIZE"],
    mutationFn: (data) => api.post("/size/add", data),
    onSuccess: () => {
      message.success("Thêm size thành công");

      navigate("/admin/size");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = (values) => {
    mutate({ name: values.name });
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>📏 Thêm kích thước</p>

        <Link to="/admin/size">
          <Button type="primary" size="large" className={styles.addButton}>
            📋 Danh sách kích thước
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form layout="vertical" onFinish={onSubmit}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin kích thước</h3>

            <Form.Item
              name="name"
              label="Tên kích thước"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên kích thước",
                },
              ]}
            >
              <Input placeholder="Nhập tên kích thước" size="large" />
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
              {isPending ? "Đang xử lý..." : "🚀 Thêm kích thước"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddSize;
