import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Button, Form, Input, message } from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";

import styles from "./index.module.scss";
import { useEffect } from "react";
import { getImageUrl } from "../../../utils/image";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const getCategoryMutation = useMutation({
    mutationKey: ["GET_CATEGORY", id],
    mutationFn: () => api.get("/category/detail/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        name: r.name,
        image: {
          preview: getImageUrl(r.image),
        },
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_CATEGORY"],
    mutationFn: (data) => api.post("/category/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật danh mục thành công");

      navigate("/admin/category");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getCategoryMutation.mutate();
  }, []);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.image.file) {
      formData.append("image", values.image.file);
    }

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={`${styles.title} ${styles.updateTitle}`}>
          ✏️ Cập nhật danh mục
        </p>

        <Link to="/admin/category">
          <Button type="primary" size="large">
            📁 Danh sách danh mục
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin danh mục</h3>
            <div className={styles.formGrid}>
              <Form.Item
                name="name"
                label="Tên danh mục"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên danh mục",
                  },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" size="large" />
              </Form.Item>

              <div className={styles.fullWidth}>
                <Form.Item name="image" label="Ảnh danh mục">
                  <FormItemImage />
                </Form.Item>
              </div>
            </div>
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
              {isPending ? "Đang xử lý..." : "✏️ Cập nhật danh mục"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateCategory;
