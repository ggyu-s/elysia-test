import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../reducers/user";

export const userRegister = (info) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const result = await axios.post("/auth/register", info.data);
    console.log(result.data);
    dispatch({
      type: USER_REGISTER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      error: error.response.data,
    });
  }
};

export const userLogin = (info) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const result = await axios.post("/auth/login", info.data);
    console.log(result.data);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${result.data.access_token}`;
    dispatch({
      type: USER_LOGIN_SUCCESS,
      data: {
        id: result.data.id,
        email: result.data.userEmail,
        name: result.data.name,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      error: error.response.data,
    });
  }
};

export const userUpdate = (info) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const result = await axios.post("/auth/update", info.data);
    console.log(result.data);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      data: {
        id: info.data.id,
        email: info.data.email,
        name: info.data.name,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      error: error.response.data,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    const result = await axios.get("/auth/logout");
    console.log(result.data);
    axios.defaults.headers.common["Authorization"] = undefined;
    dispatch({
      type: USER_LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAILURE,
      error: error.response.data,
    });
  }
};
