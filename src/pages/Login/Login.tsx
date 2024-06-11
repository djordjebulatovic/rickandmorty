// Todo: u komponentama ( i drugim js fajlovima ) importe gledamo da odvojimo radi preglednosti,
// prvo idu importi iz node_modulsa ( react, react-router-dom etc )
// zatim red razmaka, pa relative imports, i onda red razmaka pa css

import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Checkbox, Form, Input } from "antd";

import styles from "./Login.module.scss";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  // Todo: Pogledaj u ANTD Form komponentu pa uradi login stranicu uz pomoc nje, to je neki standard za vecinu formi posto resava gomilu stvari
  // kao sto su validacija, stilovi, bindovanje statea i slicno, probaj primeni funkcionalnosti kao sto su required fields, regex validations
  const navigate = useNavigate();
  const signIn = useSignIn();

  const onFinish = (value) => {
    if (value.username === "admin" && value.password === "admin") {
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinish}
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
              // {
              //   pattern: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
              //   message: "Please enter a valid channel ID",
              // },
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
