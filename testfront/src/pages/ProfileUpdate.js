import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userUpdate } from "../actions/useraction";
import UserForm from "../components/UserForm";
import useInput from "../hooks/useinput";

function ProfileUpdate() {
  const { userInfo, userUpdateDone, userUpdateError } = useSelector(
    (state) => state.user
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [email, onChangeEmail] = useInput(userInfo ? userInfo.email : "");
  const [name, onChangeName] = useInput(userInfo ? userInfo.name : "");

  /**
   * 클릭시 업데이트 디스패치
   */
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      alert("password error");
      return;
    }
    dispatch(
      userUpdate({
        data: {
          id: userInfo && userInfo.id,
          email,
          name,
          password,
        },
      })
    );
  }, [password, passwordCheck, dispatch, userInfo, email, name]);

  /**
   * 취소버튼 클릭시 메인화면으로 이동
   */
  const onCancleBack = useCallback(() => {
    history.replace("/");
  }, [history]);

  /**
   * 아이다가 없거나 업데이트과정이 끝나면 메인페이지 이동
   */
  useEffect(() => {
    if (userUpdateDone) {
      history.replace("/");
    }
    if (userInfo === null) {
      alert("로그인 해주세요.");
      history.replace("/");
    }
  }, [userUpdateDone, history, userInfo]);

  /**
   * 에러 발생시 에러 표시
   */
  useEffect(() => {
    if (userUpdateError) {
      alert(userUpdateError);
    }
  }, [userUpdateError]);

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
