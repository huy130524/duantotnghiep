import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Button, Form, Input, message } from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";

import styles from "./index.module.scss";
import { useEffect } from "react";
import { getImageUrl2 } from "../../../utils/image";

const UpdateBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const getBrandMutation = useMutation({
    mutationKey: ["GET_BRAND", id],
    mutationFn: () => api.get("/brand/detail/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        name: r.name,
        logo: {
          preview: getImageUrl2(r.logo),
        },
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_BRAND"],
    mutationFn: (data) => api.post("/brand/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật thương hiệu thành công");

      navigate("/admin/brand");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getBrandMutation.mutate();
  }, []);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.logo.file) {
      formData.append("logo", values.logo.file);
    }

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Cập nhật thương hiệu</p>

        <Link to="/admin/brand">
          <Button type="primary">Danh sách thương hiệu</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit} form={form}>
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
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        <Form.Item name="logo" label="Logo">
          <FormItemImage />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Cập nhật thương hiệu
        </Button>
      </Form>
    </>
  );
};

export default UpdateBrand;
