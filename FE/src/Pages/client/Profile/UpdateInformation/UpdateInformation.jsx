import { Form, Radio, Input, Button, DatePicker, message } from "antd";
import FormItemImage from "../../../../components/FormItemImage/FormItemImage";
import { useProfile } from "../../../../hooks/useProfile";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../api/api";

const UpdateInformation = () => {
  const { profile, refreshProfile } = useProfile();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      fullname: profile?.fullname,
      email: profile?.email,
      phone: profile?.phone,
      gender: profile?.gender,
      address: profile?.address,
      bio: profile?.bio,
      birthday: profile?.birthday ? dayjs(profile?.birthday) : null,
      avatar: {
        preview: profile?.avatar,
      },
    });
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: (values) => api.post("/updateprofile/" + profile.id, values),
    onSuccess: () => {
      message.success("Cập nhật thông tin thành công");
      refreshProfile();
    },
  });

  const onSubmit = ({ avatar, birthday, ...values }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("birthday", birthday.format("YYYY-MM-DD"));

    if (avatar?.file) {
      formData.append("avatar", avatar.file);
    }

    updateProfileMutation.mutate(formData);
  };

  return (
    <>
      <h2 className="tw-text-[24px] tw-font-semibold tw-px-6 tw-py-4 tw-text-[#333] tw-leading-tight">
        Thông tin tài khoản
      </h2>

      <Form
        className="tw-px-6 tw-py-4 tw-max-w-[580px]"
        labelCol={{ span: 8 }}
        size="large"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          name="fullname"
          label={<p className="tw-m-0 tw-text-[16px]">Họ Tên</p>}
          className="tw-mb-3"
          rules={[{ required: true, message: "Hãy nhập họ tên" }]}
        >
          <Input placeholder="Họ Tên" className="tw-rounded" />
        </Form.Item>

        <Form.Item
          name="gender"
          label={<p className="tw-m-0 tw-text-[16px]">Giới tính</p>}
          className="tw-mb-3"
          rules={[{ required: true, message: "Hãy chọn giới tính" }]}
        >
          <Radio.Group>
            <Radio value="male">Nam</Radio>

            <Radio value="female">Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="phone"
          label={<p className="tw-m-0 tw-text-[16px]">Số điện thoại</p>}
          rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
        >
          <Input placeholder="Số điện thoại" className="tw-rounded" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<p className="tw-m-0 tw-text-[16px]">Email</p>}
          rules={[{ required: true, message: "Hãy nhập email" }]}
        >
          <Input placeholder="Email" className="tw-rounded" />
        </Form.Item>

        <Form.Item
          name="address"
          label={<p className="tw-m-0 tw-text-[16px]">Địa chỉ</p>}
          rules={[{ required: true, message: "Hãy nhập địa chỉ" }]}
        >
          <Input placeholder="Địa chỉ" className="tw-rounded" />
        </Form.Item>

        <Form.Item
          name="bio"
          label={<p className="tw-m-0 tw-text-[16px]">Bio</p>}
          rules={[{ required: true, message: "Hãy nhập bio" }]}
        >
          <Input placeholder="Bio" className="tw-rounded" />
        </Form.Item>

        <Form.Item
          name="birthday"
          label={<p className="tw-m-0 tw-text-[16px]">Ngày sinh</p>}
          rules={[{ required: true, message: "Hãy chọn ngày sinh" }]}
        >
          <DatePicker placeholder="Ngày sinh" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="avatar"
          label={<p className="tw-m-0 tw-text-[16px]">Ảnh đại diện</p>}
        >
          <FormItemImage />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            htmlType="submit"
            className="tw-uppercase tw-rounded tw-text-[14px] !tw-bg-[#e30019] !tw-text-white !tw-border-[#e30019]"
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateInformation;
