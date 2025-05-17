import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Button, Form, Input, message, Switch } from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";

import styles from "./index.module.scss";
import { useEffect } from "react";
import { getImageUrl2 } from "../../../utils/image";

const UpdateBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const getBannerMutation = useMutation({
    mutationKey: ["GET_BRAND", id],
    mutationFn: () => api.get("/banner/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        title: r.title,
        link: r.link,
        image: {
          preview: getImageUrl2(r.image),
        },
        is_active: !!r.is_active,
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_BANNER"],
    mutationFn: (data) => api.post("/banner/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật banner thành công");

      navigate("/admin/banner");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getBannerMutation.mutate();
  }, []);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("link", values.link);
    formData.append("is_active", values.is_active ? 1 : 0);

    if (values.image.file) {
      formData.append("image", values.image.file);
    }

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Cập nhật banner</p>

        <Link to="/admin/banner">
          <Button type="primary">Danh sách banner</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit} form={form}>
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
          Cập nhật banner
        </Button>
      </Form>
    </>
  );
};

export default UpdateBanner;
