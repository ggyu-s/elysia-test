import React from "react";
import { Button, Form, Input } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

const StyledButton = styled(Button)`
  margin: 5px;
`;
const GlobalStyle = createGlobalStyle`
    .ant-row{
        text-align:center
    }
`;

/**
 * 회원가입페이지 / 수정페이지
 */
function UserForm({
  email,
  password,
  passwordCheck,
  name,
  onChangeEmail,
  onChangePassword,
  onChangePasswordCheck,
  onChangeName,
  onRegister,
  onCancleBack,
}) {
  const { userRegisterLoading } = useSelector((state) => state.user);

  const layout = {
    labelCol: { span: 4 },
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <GlobalStyle />
      <Form
        {...layout}
        onFinish={onRegister}
        fields={[
          {
            name: ["Name"],
            value: name,
          },
          {
            name: ["Email"],
            value: email,
          },
        ]}
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Please input your useremail!" }]}
        >
          <Input
            placeholder="Email"
            name="Email"
            value={email}
            onChange={onChangeEmail}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="Name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Name"
            name="Name"
            value={name}
            onChange={onChangeName}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="PasswordCheck"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="PasswordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </Form.Item>
        <Form.Item>
          <StyledButton
            loading={userRegisterLoading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </StyledButton>
          <StyledButton htmlType="button" onClick={onCancleBack}>
            Cancle
          </StyledButton>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserForm;
