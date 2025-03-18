import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import {
  Button,
  Flex,
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
  }, [name]);

  const onSubmit = ({ image, ...values }) => {
    const formData = new FormData();
    formData.append("image", image.file);
    Object.entries(values).forEach(([key, value]) => {
      if (key === "variants") {
        value.forEach((variant, index) => {
          Object.entries(variant).forEach(([k, v]) => {
            formData.append(`variants[${index}][${k}]`, v ? +v : 0);
          });
        });
      } else {
        formData.append(key, value ?? null);
      }
    });

    mutate(formData);
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm sản phẩm</p>

        <Link to="/admin/category">
          <Button type="primary">Danh sách sản phẩm</Button>
        </Link>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ variants: [{}] }}
      >
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
          <Input placeholder="Nhập mã sản phẩm" />
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
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item name="slug" label="Slug">
          <Input readOnly />
        </Form.Item>

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
            options={categories?.map((it) => ({
              label: it.name,
              value: it.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="brand_id"
          label="Hãng"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hãng",
            },
          ]}
        >
          <Select
            placeholder="Chọn hãng"
            options={brands?.map((it) => ({
              label: it.name,
              value: it.id,
            }))}
          />
        </Form.Item>

        <Typography className={styles.variantTitle}>
          <span style={{ color: "red" }}>* </span>

          <span>Biến thể</span>
        </Typography>
        <Form.List name="variants" label="Biến thể">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Flex key={field.key} gap="12px">
                  <Form.Item
                    name={[field.name, "size_id"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn size",
                      },
                    ]}
                    className={styles.col}
                  >
                    <Select
                      placeholder="Chọn size"
                      options={listSize?.map((it) => ({
                        label: it.name,
                        value: it.id,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, "color_id"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn màu",
                      },
                    ]}
                    className={styles.col}
                  >
                    <Select
                      placeholder="Chọn màu"
                      options={listColor?.map((it) => ({
                        label: it.name,
                        value: it.id,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, "price"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá",
                      },
                    ]}
                    className={styles.col}
                  >
                    <InputNumber placeholder="Nhập giá" />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, "sale_price"]}
                    className={styles.col}
                  >
                    <InputNumber placeholder="Nhập giá giảm" />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, "quantity"]}
                    className={styles.col}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng",
                      },
                    ]}
                  >
                    <InputNumber placeholder="Nhập số lượng" />
                  </Form.Item>

                  <MinusCircleOutlined
                    className={styles.removeIcon}
                    onClick={() => remove(name)}
                  />
                </Flex>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  style={{ width: "100%" }}
                >
                  Thêm biến thể
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="image"
          label="Ảnh sản phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh sản phẩm",
            },
          ]}
        >
          <FormItemImage />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <TextArea placeholder="Nhập mô tả" rows={6} />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Thêm sản phẩm
        </Button>
      </Form>
    </>
  );
};

export default AddProduct;
