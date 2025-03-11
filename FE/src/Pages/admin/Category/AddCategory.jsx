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
        <p className={styles.title}>Thêm danh mục</p>

        <Link to="/admin/category">
          <Button type="primary">Danh sách danh mục</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit}>
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
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

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

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Thêm danh mục
        </Button>
      </Form>
    </>
  );
};

export default AddCategory;
