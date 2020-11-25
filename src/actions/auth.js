import * as actionTypes from "./types";

import AuthService from "../services/auth.service";


export const register = (userInfo) => (dispatch) => {
  return AuthService.register(userInfo).then(
    (response) => {
      dispatch({
        type: actionTypes.REGISTER_SUCESS,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (err) => {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
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
    (data) => {
      dispatch({
        type: actionTypes.LOGIN_SUCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (err) => {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

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
