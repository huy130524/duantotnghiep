import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const AddProductPage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`http://localhost:3000/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      return await response.json();
    },
    onSuccess: () => {
      messageApi.success("Thêm sản phẩm thành công");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const normFile = (e) => {
    return Array.isArray(e) ? e : e?.fileList;
  };

  const onHandleChange = (info) => {
    if (info.file.status === "done") {
      setImageUrls([...imageUrls, info.file.response.secure_url]);
    }
  };

  const onFinish = (values) => {
    mutate({ ...values, imageUrls });
  };

  return (
    <div>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Bắt buộc nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: "Bắt buộc nhập giá sản phẩm" },
            { type: "number", min: 0, message: "Giá phải lớn hơn 0" },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://api.cloudinary.com/v1_1/havantu2501/image/upload"
            listType="picture-card"
            multiple
            data={{ upload_preset: "demo-19201" }}
            onChange={onHandleChange}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item label="Mô tả sản phẩm" name="description">
          <TextArea />
        </Form.Item>

        <Form.Item label="Tình trạng sản phẩm" name="inStock">
          <Radio.Group>
            <Radio value={true}>Còn hàng</Radio>
            <Radio value={false}>Hết hàng</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Danh mục sản phẩm" name="category">
          <Select>
            <Select.Option value="Category 1">Category 1</Select.Option>
            <Select.Option value="Category 2">Category 2</Select.Option>
            <Select.Option value="Category 3">Category 3</Select.Option>
            <Select.Option value="Category 4">Category 4</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
