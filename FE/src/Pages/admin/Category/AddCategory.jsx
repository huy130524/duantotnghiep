import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Form, Input, message } from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

const AddCategory = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_CATEGORY"],
    mutationFn: (data) => api.post("/category/add", data),
    onSuccess: () => {
      message.success("Thêm danh mục thành công");

      navigate("/admin/category");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image.file);

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>➕ Thêm danh mục</p>

        <Link to="/admin/category">
          <Button type="primary" size="large">
            📁 Danh sách danh mục
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form layout="vertical" onFinish={onSubmit}>
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
                <Form.Item
                  name="image"
                  label="Ảnh danh mục"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ảnh danh mục",
                    },
                  ]}
                >
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
              {isPending ? "Đang xử lý..." : "➕ Thêm danh mục"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddCategory;
