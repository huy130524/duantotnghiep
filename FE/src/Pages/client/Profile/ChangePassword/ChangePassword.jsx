import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../api/api";
import { useProfile } from "../../../../hooks/useProfile";

const ChangePassword = () => {
  const { profile } = useProfile();

  const [form] = Form.useForm();

  const changePasswordMutation = useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: (values) => api.post("/change-password/" + profile.id, values),
    onSuccess: () => {
      message.success("Đổi mật khẩu thành công");
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const onSubmit = (values) => {
    changePasswordMutation.mutate(values);
  };

  return (
    <>
      <h2 className="tw-text-[24px] tw-font-semibold tw-px-6 tw-py-4 tw-text-[#333] tw-leading-tight">
        Đổi mật khẩu
      </h2>

      <Form
        className="tw-px-6 tw-py-4 tw-max-w-[580px]"
        labelCol={{ span: 8 }}
        size="large"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          name="current_password"
          label={<p className="tw-m-0 tw-text-[16px]">Mật khẩu hiện tại</p>}
          className="tw-mb-3"
          rules={[{ required: true, message: "Hãy nhập mật khẩu hiện tại" }]}
        >
          <Input.Password
            placeholder="Mật khẩu hiện tại"
            className="tw-rounded"
          />
        </Form.Item>

        <Form.Item
          name="new_password"
          label={<p className="tw-m-0 tw-text-[16px]">Mật khẩu mới</p>}
          className="tw-mb-3"
          rules={[{ required: true, message: "Hãy nhập mật khẩu mới" }]}
        >
          <Input.Password placeholder="Mật khẩu mới" className="tw-rounded" />
        </Form.Item>

        <Form.Item
          name="new_password_confirmation"
          label={<p className="tw-m-0 tw-text-[16px]">Xác nhận mật khẩu</p>}
          className="tw-mb-3"
          rules={[
            { required: true, message: "Nhập lại mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không trùng khớp"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            className="tw-rounded"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            htmlType="submit"
            className="tw-uppercase tw-rounded tw-text-[14px] !tw-bg-[#e30019] !tw-text-white !tw-border-[#e30019]"
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
