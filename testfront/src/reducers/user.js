export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAILURE = "USER_UPDATE_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

export const STATE_INIT = "STATE_INIT";

const inititalState = {
  userInfo: null, // 로그인한 유저정보 저장
  userRegisterLoading: false,
  userRegisterDone: false,
  userRegisterError: null,
  userLoginLoading: false,
  userLoginDone: false,
  userLoginError: null,
  userUpdateLoading: false,
  userUpdateDone: false,
  userUpdateError: null,
  userLogoutLoading: false,
  userLogoutDone: false,
  userLogoutError: null,
};

const userReducer = (state = inititalState, action) => {
  switch (action.type) {
    case STATE_INIT:
      return {
        ...state,
        userUpdateDone: false,
        userLoginDone: false,
        userRegisterDone: false,
        userRegisterError: null,
        userLoginError: null,
        userUpdateError: null,
      };
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        userRegisterLoading: true,
        userRegisterDone: false,
        userRegisterError: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userRegisterLoading: false,
        userRegisterDone: true,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        userRegisterLoading: false,
        userRegisterError: action.error,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        userLoginLoading: true,
        userLoginDone: false,
        userLoginError: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginLoading: false,
        userLoginDone: true,
        userInfo: action.data,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoginLoading: false,
        userLoginError: action.error,
      };
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        userUpdateLoading: true,
        userUpdateDone: false,
        userUpdateError: null,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateDone: true,
        userInfo: action.data,
      };
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        userUpdateLoading: false,
        userUpdateError: action.error,
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        userLogoutLoading: true,
        userLogoutDone: false,
        userLogoutError: null,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userLogoutLoading: false,
        userLogoutDone: true,
        userInfo: null,
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        userLogoutLoading: false,
        userLogoutError: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
