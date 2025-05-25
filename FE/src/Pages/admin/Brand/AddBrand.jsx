import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Form, Input, message } from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

const AddBrand = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_BRAND"],
    mutationFn: (data) => api.post("/brand/add", data),
    onSuccess: () => {
      message.success("Thêm thương hiệu thành công");

      navigate("/admin/brand");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("logo", values.logo.file);

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm thương hiệu</p>

        <Link to="/admin/brand">
          <Button type="primary" size="large" className={styles.navButton}>
            Danh sách thương hiệu
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form layout="vertical" onFinish={onSubmit}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin thương hiệu</h3>

            <Form.Item
              name="name"
              label="Tên thương hiệu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên thương hiệu",
                },
              ]}
            >
              <Input placeholder="Nhập tên thương hiệu" size="large" />
            </Form.Item>

            <Form.Item
              name="logo"
              label="Logo thương hiệu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn logo",
                },
              ]}
            >
              <FormItemImage />
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
            Thêm thương hiệu
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddBrand;
