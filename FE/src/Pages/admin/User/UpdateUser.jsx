import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Form, Input, message, Select } from "antd";
import FormItemImage from "../../../components/FormItemImage/FormItemImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { useEffect } from "react";
import { getImageUrl } from "../../../utils/image";

const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [form] = Form.useForm();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["USER_DETAIL", id],
    queryFn: async () => {
      const response = await api.get(`/users/show/${id}`);
      return response;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        fullname: userData.fullname,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        role: userData.role,
        image: userData.avatar
          ? {
              preview: getImageUrl(userData.avatar),
            }
          : null,
      });
    }
  }, [userData, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: (data) => api.post(`/users/update/${id}`, data),
    onSuccess: () => {
      message.success("Cập nhật người dùng thành công");
      navigate("/admin/user");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại";
      message.error(errorMessage);
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("fullname", values.fullname);
    formData.append("email", values.email);
    formData.append("role", values.role);
    formData.append("phone", values.phone);
    formData.append("address", values.address);

    if (values.password) {
      formData.append("password", values.password);
    }

    if (values.image && values.image.file) {
      formData.append("image", values.image.file);
    }

    mutate(formData);
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <>
      <div className={styles.pageTitle}>
        <p className={styles.updateTitle}>✏️ Cập nhật người dùng</p>

        <Link to="/admin/user">
          <Button type="primary" size="large">
            👥 Danh sách người dùng
          </Button>
        </Link>
      </div>

      <div className={styles.formContainer}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>

            <div className={styles.formGrid}>
              <Form.Item
                name="fullname"
                label="📝 Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên",
                  },
                  {
                    min: 2,
                    message: "Họ và tên phải có ít nhất 2 ký tự",
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="📧 Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ",
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ email" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="🔒 Mật khẩu mới (tùy chọn)"
                rules={[
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu mới (để trống nếu không đổi)"
                  size="large"
                  className="input-search"
                />
              </Form.Item>

              <Form.Item
                name="role"
                label="👤 Vai trò"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn vai trò",
                  },
                ]}
              >
                <Select placeholder="Chọn vai trò" size="large">
                  <Select.Option value="user">Khách hàng</Select.Option>
                  <Select.Option value="staff">Nhân viên</Select.Option>
                  <Select.Option value="admin">Quản trị viên</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="phone"
                label="📞 Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Số điện thoại phải có 10-11 chữ số",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" size="large" />
              </Form.Item>

              <div className={styles.fullWidth}>
                <Form.Item
                  name="address"
                  label="🏠 Địa chỉ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Nhập địa chỉ"
                    rows={3}
                    size="large"
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Ảnh đại diện</h3>

            <div className={styles.imageSection}>
              <Form.Item name="image" label="🖼️ Ảnh đại diện">
                <FormItemImage />
              </Form.Item>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isPending}
              loading={isPending}
              className={styles.submitButton}
              size="large"
            >
              {isPending ? "Đang xử lý..." : "💾 Cập nhật người dùng"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateUser;
