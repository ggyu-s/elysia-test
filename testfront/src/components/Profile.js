import { Avatar, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { UserOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../actions/useraction";

function Profile({ userInfo }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onMoveUpdate = useCallback(() => {
    history.replace("profileupdate");
  }, [history]);

  const onClickLogout = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <div onClick={onMoveUpdate}>프로필수정</div>,
        <div onClick={onClickLogout}>로그아웃</div>,
      ]}
    >
      <Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        title={userInfo.name}
        description={userInfo.email}
      />
    </Card>
  );
}

export default Profile;
