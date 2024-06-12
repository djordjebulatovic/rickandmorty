import { toast } from "react-toastify";
import { Form, Input, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

import Button from "../../../../components/Button/Button";

export interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const onFinish = (value) => {
    if (value.username === "admin_test" && value.password === "admin") {
      signIn({
        auth: {
          token: "dsad...",
          type: "Bearer",
        },
        // refresh: "dsad...",
        userState: {
          name: value.username,
          uid: "user.id",
        },
      });
      navigate("/");
    } else {
      toast.error("Error autha", {
        position: "top-center",
      });
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
          {
            pattern: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
            message: "Please enter a valid channel ID",
          },
          {
            min: 4,
            message: "Please more than 4 characters",
          },
          {
            max: 16,
            message: "Please less than 16 characters",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            min: 4,
            message: "Please more than 4 characters",
          },
          {
            max: 16,
            message: "Please less than 16 characters",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" testId="form-submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
