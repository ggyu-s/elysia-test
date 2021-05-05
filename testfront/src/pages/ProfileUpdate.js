import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userUpdate } from "../actions/useraction";
import UserForm from "../components/UserForm";
import useInput from "../hooks/useinput";

function ProfileUpdate() {
  const { userInfo, userUpdateDone } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [email, onChangeEmail] = useInput(userInfo.email);
  const [name, onChangeName] = useInput(userInfo.name);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      alert("password error");
      return;
    }
    dispatch(
      userUpdate({
        data: {
          id: userInfo.id,
          email,
          name,
          password,
        },
      })
    );
  }, [password, passwordCheck, dispatch, userInfo.id, email, name]);

  const onCancleBack = useCallback(() => {
    history.replace("/");
  }, [history]);

  useEffect(() => {
    if (userUpdateDone) {
      history.replace("/");
    }
  }, [userUpdateDone, history]);

  return (
    <>
      {userInfo ? (
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
      ) : null}
    </>
  );
}

export default ProfileUpdate;
