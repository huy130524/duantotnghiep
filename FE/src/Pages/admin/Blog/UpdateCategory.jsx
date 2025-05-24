import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Button, Form, Input, message, Select } from "antd";

import styles from "./index.module.scss";
import { useEffect } from "react";
import { genSlug } from "../../../utils/genSlug";
import SunEditorFormItem from "../../../components/SunEditorFormItem/SunEditorFormItem";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";
import { getImageUrl2 } from "../../../utils/image";
import TextArea from "antd/es/input/TextArea";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();
  const title = Form.useWatch("title", form);

  const { data } = useQuery({
    queryKey: ["LIST_CATEGORY"],
    queryFn: () => api.get("/categories"),
  });

  const getBlogMutation = useMutation({
    mutationKey: ["GET_BLOG", id],
    mutationFn: () => api.get("/blog/detail/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        title: r.title,
        slug: r.slug,
        category_id: r.category_id,
        desc: r.desc,
        content: r.content,
        image: {
          preview: getImageUrl2(r.image),
        },
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_BLOG"],
    mutationFn: (data) => api.post("/blog/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật bài viết thành công");

      navigate("/admin/blog");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getBlogMutation.mutate();
  }, [getBlogMutation]);

  useEffect(() => {
    if (title) {
      form.setFieldValue("slug", genSlug(title));
    }
  }, [title, form]);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    if (values.image.file) {
      formData.append("image", values.image.file);
    }

    formData.append("slug", values.slug);
    formData.append("category_id", values.category_id);
    formData.append("desc", values.desc);
    formData.append("content", values.content);
    formData.append("user_id", getBlogMutation.data.user_id);

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={`${styles.title} ${styles.updateTitle}`}>
          Cập nhật bài viết
        </p>

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
            <Form.Item name="image" label="Hình ảnh bài viết">
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
              {isPending ? "Đang xử lý..." : "✏️ Cập nhật bài viết"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateBlog;
