import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import { STATE_INIT } from "../reducers/user";

function Main() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  /**
   * 상태 초기화 디스패치
   */
  useEffect(() => {
    dispatch({
      type: STATE_INIT,
    });
  }, [dispatch]);

  return <>{userInfo ? <Profile userInfo={userInfo} /> : <LoginForm />}</>;
}

export default Main;
