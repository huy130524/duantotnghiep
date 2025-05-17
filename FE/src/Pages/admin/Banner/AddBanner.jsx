import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Form, Input, message, Switch } from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

const AddBanner = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_BANNER"],
    mutationFn: (data) => api.post("/banner/add", data),
    onSuccess: () => {
      message.success("Thêm banner thành công");

      navigate("/admin/banner");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("link", values.link);
    formData.append("image", values.image.file);
    formData.append("is_active", values.is_active ? 1 : 0);

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm banner</p>

        <Link to="/admin/banner">
          <Button type="primary">Danh sách banner</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Tên banner"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên banner",
            },
          ]}
        >
          <Input placeholder="Nhập tên banner" />
        </Form.Item>

        <Form.Item
          name="link"
          label="Link banner"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập link",
            },
            {
              type: "url",
              message: "Vui lòng nhập link hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập link banner" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh",
            },
          ]}
        >
          <FormItemImage />
        </Form.Item>

        <Form.Item name="is_active" label="Trạng thái" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Thêm banner
        </Button>
      </Form>
    </>
  );
};

export default AddBanner;
