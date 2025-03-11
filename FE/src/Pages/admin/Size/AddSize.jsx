import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

const AddSize = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["ADD_SIZE"],
    mutationFn: (data) => api.post("/size/add", data),
    onSuccess: () => {
      message.success("Thêm size thành công");

      navigate("/admin/size");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = (values) => {
    mutate({ name: values.name });
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Thêm size</p>

        <Link to="/admin/size">
          <Button type="primary">Danh sách size</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Tên size"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên size",
            },
          ]}
        >
          <Input placeholder="Nhập tên size" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
          loading={isPending}
        >
          Thêm size
        </Button>
      </Form>
    </>
  );
};

export default AddSize;
