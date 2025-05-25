import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Button, Form, Input, message } from "antd";

import styles from "./index.module.scss";
import { useEffect } from "react";

const UpdateSize = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const getSizeMutation = useMutation({
    mutationKey: ["GET_SIZE", id],
    mutationFn: () => api.get("/size/detail/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        name: r.name,
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_SIZE"],
    mutationFn: (data) => api.post("/size/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật size thành công");

      navigate("/admin/size");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getSizeMutation.mutate();
  }, []);

  const onSubmit = (values) => {
    mutate({ name: values.name });
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>📝 Cập nhật kích thước</p>

        <Link to="/admin/size">
          <Button type="primary" size="large" className={styles.addButton}>
            📋 Danh sách kích thước
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form layout="vertical" onFinish={onSubmit} form={form}>
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
              {isPending ? "Đang xử lý..." : "💾 Cập nhật kích thước"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateSize;
