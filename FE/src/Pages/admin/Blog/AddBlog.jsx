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
import TextArea from "antd/es/input/TextArea";

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
    formData.append("desc", values.desc);
    formData.append("content", values.content);
    formData.append("user_id", profile.id);

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm bài viết</p>

        <Link to="/admin/blog">
          <Button type="primary" size="large">
            📋 Danh sách bài viết
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>
            <div className={styles.formGrid}>
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
                <Input placeholder="Nhập tiêu đề bài viết" size="large" />
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
                  options={data?.map((it) => ({
                    label: it.name,
                    value: it.id,
                  }))}
                  placeholder="Chọn danh mục bài viết"
                  size="large"
                />
              </Form.Item>

              <div className={styles.fullWidth}>
                <Form.Item name="slug" label="Slug bài viết">
                  <Input readOnly size="large" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Hình ảnh & Mô tả</h3>
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

            <Form.Item
              name="desc"
              label="Mô tả bài viết"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả bài viết",
                },
              ]}
            >
              <TextArea
                placeholder="Nhập mô tả bài viết..."
                autoSize={{
                  minRows: 4,
                  maxRows: 8,
                }}
                size="large"
              />
            </Form.Item>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Nội dung bài viết</h3>
            <Form.Item
              name="content"
              label="Nội dung chi tiết"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung bài viết",
                },
              ]}
            >
              <SunEditorFormItem
                placeholder="Nhập nội dung bài viết..."
                height={400}
              />
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
              {isPending ? "Đang xử lý..." : "🚀 Thêm bài viết"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBlog;
