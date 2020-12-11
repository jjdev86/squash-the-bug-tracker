import * as actionTypes from "./types";

import AuthService from "../services/auth.service";

export const register = (userInfo) => (dispatch) => {
  return AuthService.register(userInfo).then(
    (response) => {
      dispatch({
        type: actionTypes.REGISTER_SUCESS,
        payload: {user: response.data.user}
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: response.data.msg,
      });
      return Promise.resolve();
    },
    (err) => {
      console.log(err.response, `login error`)
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.msg ||
        err.toString();

      dispatch({
        type: actionTypes.REGISTER_FAIL,
      });
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const login = (userInfo) => (dispatch) => {
  return AuthService.login(userInfo).then(
    (response) => {
      dispatch({
        type: actionTypes.LOGIN_SUCESS,
        payload: { user: response.data.user },
      });
      return Promise.resolve();
    },
    (err) => {
      console.log(err.response, `login error`)
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.msg ||
        err.toString();
      console.log(message,  `message from response`)
      dispatch({
        type: actionTypes.LOGIN_FAIL,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: actionTypes.LOG_OUT,
  });
};
