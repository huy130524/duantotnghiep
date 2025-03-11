import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Button, Form, Input, message } from "antd";

import styles from "./index.module.scss";
import { useEffect } from "react";

const UpdateSize = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const getSizeMutation = useMutation({
    mutationKey: ["GET_SIZE", id],
    mutationFn: () => api.get("/size/detail/" + id),
    onSuccess: (r) => {
      form.setFieldsValue({
        name: r.name,
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_SIZE"],
    mutationFn: (data) => api.post("/size/update/" + id, data),
    onSuccess: () => {
      message.success("Cập nhật size thành công");

      navigate("/admin/size");
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    getSizeMutation.mutate();
  }, []);

  const onSubmit = (values) => {
    mutate({ name: values.name });
  };

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.title}>Cập nhật size</p>

        <Link to="/admin/size">
          <Button type="primary">Danh sách size</Button>
        </Link>
      </div>

      <Form layout="vertical" onFinish={onSubmit} form={form}>
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
          Cập nhật size
        </Button>
      </Form>
    </>
  );
};

export default UpdateSize;
