import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Form, Input, message, Select } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { useEffect } from "react";
import { genSlug } from "../../../utils/genSlug";
import SunEditorFormItem from "../../../components/SunEditorFormItem/SunEditorFormItem";
import { useProfile } from "../../../hooks/useProfile";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";

const AddBlog = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const title = Form.useWatch("title", form);

  const { data } = useQuery({
    queryKey: ["LIST_CATEGORY"],
    queryFn: () => api.get("/categories"),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_BLOG"],
    mutationFn: (data) => api.post("/blog/add", data),
    onSuccess: () => {
      message.success("Thêm bài viết thành công");

      navigate("/admin/blog");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    form.setFieldValue("slug", genSlug(title));
  }, [title]);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", values.image.file);
    formData.append("slug", values.slug);
    formData.append("category_id", values.category_id);
    formData.append("content", values.content);
    formData.append("user_id", profile.id);

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm bài viết</p>

        <Link to="/admin/blog">
          <Button type="primary">Danh sách bài viết</Button>
        </Link>
      </div>

      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Tiêu đề bài viết"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề bài viết",
            },
          ]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh bài viết"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình ảnh bài viết",
            },
          ]}
        >
          <FormItemImage />
        </Form.Item>

        <Form.Item name="slug" label="Slug bài viết">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          name="category_id"
          label="Danh mục bài viết"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục bài viết",
            },
          ]}
        >
          <Select
            options={data?.map((it) => ({ label: it.name, value: it.id }))}
            placeholder="Chọn danh mục bài viết"
          />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung bài viết"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung bài viết",
            },
          ]}
        >
          <SunEditorFormItem
            placeholder="Nhập nội dung bài viết"
            height={300}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Thêm bài viết
        </Button>
      </Form>
    </>
  );
};

export default AddBlog;
