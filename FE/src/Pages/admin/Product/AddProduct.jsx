import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
} from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { useEffect } from "react";
import { genSlug } from "../../../utils/genSlug";
import TextArea from "antd/es/input/TextArea";
import { MinusCircleOutlined } from "@ant-design/icons";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const name = Form.useWatch(["name"], form);

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_PRODUCT"],
    mutationFn: (data) => api.post("/product/add", data),
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công");

      navigate("/admin/product");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["LIST_CATEGORY"],
    queryFn: () => api.get("/categories"),
  });

  const { data: brands } = useQuery({
    queryKey: ["LIST_BRAND"],
    queryFn: () => api.get("/brands"),
  });

  const { data: listSize } = useQuery({
    queryKey: ["LIST_SIZE"],
    queryFn: () => api.get("/sizes"),
  });

  const { data: listColor } = useQuery({
    queryKey: ["LIST_COLOR"],
    queryFn: () => api.get("/colors"),
  });

  useEffect(() => {
    form.setFieldValue("slug", genSlug(name));
  }, [name, form]);

  const onSubmit = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "variants") {
        value.forEach((variant, index) => {
          Object.entries(variant).forEach(([k, v]) => {
            if (k === "image") {
              formData.append(`variants[${index}][${k}]`, v.file);
            } else {
              formData.append(`variants[${index}][${k}]`, v ? +v : 0);
            }
          });
        });
      } else {
        formData.append(key, value ?? "");
      }
    });

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>📋 Thêm sản phẩm</p>

        <Link to="/admin/product">
          <Button type="primary" size="large">
            📋 Danh sách sản phẩm
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{ variants: [{}] }}
        >
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>
            <div className={styles.formGrid}>
              <Form.Item
                name="code"
                label="Mã sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã sản phẩm",
                  },
                ]}
              >
                <Input placeholder="Nhập mã sản phẩm" size="large" />
              </Form.Item>

              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên sản phẩm",
                  },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" size="large" />
              </Form.Item>

              <div className={styles.fullWidth}>
                <Form.Item name="slug" label="Slug">
                  <Input readOnly size="large" />
                </Form.Item>
              </div>

              <Form.Item
                name="category_id"
                label="Danh mục"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn danh mục"
                  size="large"
                  options={categories?.map((it) => ({
                    label: it.name,
                    value: it.id,
                  }))}
                />
              </Form.Item>

              <Form.Item
                name="brand_id"
                label="Thương hiệu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thương hiệu",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn thương hiệu"
                  size="large"
                  options={brands?.map((it) => ({
                    label: it.name,
                    value: it.id,
                  }))}
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Mô tả</h3>

            <Form.Item
              name="description"
              label="Mô tả sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả",
                },
              ]}
            >
              <TextArea
                placeholder="Nhập mô tả sản phẩm..."
                rows={6}
                size="large"
              />
            </Form.Item>
          </div>

          <div className={styles.formSection}>
            <div className={styles.variantSection}>
              <Typography className={styles.variantTitle}>
                <span style={{ color: "red" }}>* </span>
                <span>Biến thể sản phẩm</span>
              </Typography>

              <Form.List name="variants">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className={styles.variantCard}>
                        <div className={styles.variantHeader}>
                          <span className={styles.variantNumber}>
                            Biến thể #{index + 1}
                          </span>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className={styles.removeIcon}
                              onClick={() => remove(field.name)}
                              title="Xóa biến thể"
                            />
                          )}
                        </div>

                        <div className={styles.variantImageSection}>
                          <Form.Item
                            name={[field.name, "image"]}
                            label="🖼️ Ảnh biến thể"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn ảnh biến thể",
                              },
                            ]}
                          >
                            <FormItemImage />
                          </Form.Item>
                        </div>

                        <div className={styles.variantGrid}>
                          <Form.Item
                            name={[field.name, "size_id"]}
                            label="📏 Size"
                            rules={[
                              {
                                required: true,
                                message: "Chọn size",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Chọn size"
                              size="large"
                              options={listSize?.map((it) => ({
                                label: it.name,
                                value: it.id,
                              }))}
                            />
                          </Form.Item>

                          <Form.Item
                            name={[field.name, "color_id"]}
                            label="🎨 Màu sắc"
                            rules={[
                              {
                                required: true,
                                message: "Chọn màu",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Chọn màu"
                              size="large"
                              options={listColor?.map((it) => ({
                                label: it.name,
                                value: it.id,
                              }))}
                            />
                          </Form.Item>

                          <Form.Item
                            name={[field.name, "quantity"]}
                            label="📦 Số lượng"
                            rules={[
                              {
                                required: true,
                                message: "Nhập số lượng",
                              },
                            ]}
                          >
                            <InputNumber
                              placeholder="Số lượng"
                              size="large"
                              style={{ width: "100%" }}
                              min={0}
                            />
                          </Form.Item>

                          <Form.Item
                            name={[field.name, "price"]}
                            label="💰 Giá gốc"
                            rules={[
                              {
                                required: true,
                                message: "Nhập giá",
                              },
                            ]}
                          >
                            <InputNumber
                              placeholder="Nhập giá"
                              size="large"
                              style={{ width: "100%" }}
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            name={[field.name, "sale_price"]}
                            label="🏷️ Giá giảm"
                          >
                            <InputNumber
                              placeholder="Giá giảm (tùy chọn)"
                              size="large"
                              style={{ width: "100%" }}
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                            />
                          </Form.Item>
                        </div>
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        className={styles.addVariantButton}
                      >
                        ➕ Thêm biến thể mới
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
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
              {isPending ? "Đang xử lý..." : "🚀 Thêm sản phẩm"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
