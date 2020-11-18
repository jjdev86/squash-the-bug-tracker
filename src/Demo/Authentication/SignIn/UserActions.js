// login user
import * as actionTypes from '../../../store/actions';

export const fetchUser = (userInfo) => (dispatch) => {
  //login
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + btoa(userInfo.email + ":" + userInfo.password)
  );
  const auth = headers.get("Authorization");

  fetch("/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: auth,
    },
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 409 || res.status === 500) {
        throw res;
      }
    } else {
      return res.json();
    }
  })
  .then(data => {
    localStorage.setItem("token", data.token);
    dispatch({type: actionTypes.SET_USER, payload: data.user});

  })
  .catch(err => {
    if (err.status)
    if (err.text) {
      err.text().then((serverError) => {
        console.log(JSON.parse(serverError), `error message`);
        // setLoginErrors(JSON.parse(serverError));
      });
    } else {
      console.log("hard code error");
    }
  })

};
// create new user
export const signUserUp = (userInfo) => (dispatch) => {};
// keep user login
export const autoLogin = () => (dispatch) => {
  fetch('/auto_login', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })

  .then(res => res.json())
  .then(data => {
    console.log(data, `data`)
  })

};
