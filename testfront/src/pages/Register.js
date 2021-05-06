import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRegister } from "../actions/useraction";
import UserForm from "../components/UserForm";
import useInput from "../hooks/useinput";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userRegisterDone, userRegisterError, userInfo } = useSelector(
    (state) => state.user
  );
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [name, onChangeName] = useInput("");

  /**
   * 회원가입 디스패치
   */
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      alert("password error");
      return;
    }
    dispatch(
      userRegister({
        data: {
          email,
          password,
          name,
        },
      })
    );
    console.log(password, passwordCheck);
  }, [dispatch, email, password, passwordCheck, name]);

  /**
   * 취소버튼클릭시 메인화면 이동
   */
  const onCancleBack = useCallback(() => {
    history.replace("/");
  }, [history]);

  /**
   * 로그인 또는 회원가입이 끝났을 때 메인화면 이동
   */
  useEffect(() => {
    if (userRegisterDone || userInfo) {
      history.replace("/");
    }
  }, [history, userInfo, userRegisterDone]);

  /**
   * 에러 발생시 에러 표시
   */
  useEffect(() => {
    if (userRegisterError) {
      alert(userRegisterError);
    }
  }, [userRegisterError]);

  return (
    <UserForm
      email={email}
      password={password}
      passwordCheck={passwordCheck}
      name={name}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangePasswordCheck={onChangePasswordCheck}
      onChangeName={onChangeName}
      onRegister={onSubmit}
      onCancleBack={onCancleBack}
    />
  );
}

export default Register;
