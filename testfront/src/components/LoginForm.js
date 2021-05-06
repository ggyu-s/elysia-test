import React, { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useinput";
import { userLogin } from "../actions/useraction";
import { useHistory } from "react-router-dom";
import { STATE_INIT } from "../reducers/user";

const StyledButton = styled(Button)`
  margin: 5px;
`;
const GlobalStyle = createGlobalStyle`
    .ant-row{
        text-align:center
    }
`;

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userLoginLoading, userLoginError } = useSelector(
    (state) => state.user
  );
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const layout = {
    labelCol: { span: 4 },
  };

  /**
   * 로그인클릭시 디스패치
   */
  const onSubmit = useCallback(() => {
    dispatch(
      userLogin({
        data: {
          email,
          password,
        },
      })
    );
  }, [dispatch, email, password]);

  /**
   * 회원가입페이지로 이동
   */
  const onClickRegister = useCallback(() => {
    history.replace("/register");
  }, [history]);

  /**
   * 로그인 실패시 에러표시
   */
  useEffect(() => {
    if (userLoginError) {
      alert(userLoginError);
      dispatch({
        type: STATE_INIT,
      });
    }
  }, [dispatch, userLoginError]);

  return (
    <div style={{ width: "500px", margin: "30px auto" }}>
      <GlobalStyle />
      <Form {...layout} onFinish={onSubmit}>
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Email" value={email} onChange={onChangeEmail} />
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
        <Form.Item>
          <StyledButton
            loading={userLoginLoading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </StyledButton>
          <StyledButton htmlType="button" onClick={onClickRegister}>
            Register
          </StyledButton>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
