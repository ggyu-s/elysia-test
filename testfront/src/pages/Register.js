import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRegister } from "../actions/useraction";
import UserForm from "../components/UserForm";
import useInput from "../hooks/useinput";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userRegisterDone } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [name, onChangeName] = useInput("");

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

  const onCancleBack = useCallback(() => {
    history.replace("/");
  }, [history]);

  useEffect(() => {
    if (userRegisterDone) {
      history.replace("/");
    }
  }, [history, userRegisterDone]);

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
