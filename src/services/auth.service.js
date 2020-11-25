// login user
import * as actionTypes from '../../../store/actions';


export const login = (userInfo, history) => {

  fetch("/api/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(userInfo),
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
    // dispatch({type: actionTypes.SET_USER, payload: data.user});
    // history.push('/dashboard');
    return data;
  })

  .catch(err => {
    if (err.status)
    if (err.text) {
      err.text().then((serverError) => {
        console.log(JSON.parse(serverError), `error message`);
      });
    } else {
      console.log("hard code error");
    }
  })

};
// create new user
export const register = (userInfo, history) => {
  fetch('/api/sign-up', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(userInfo)
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 409 || res.status === 500 || res.status === 400) {
        throw res;
      }
    } else {
      return res.json();
    }
  })
  .then(data => {
    localStorage.setItem("token", data.token);
    // dispatch({type: actionTypes.SET_USER, payload: data.user});
    return data;
    // history.push('/dashboard');
  })
  .catch(err => {
    if (err.status)
    if (err.text) {
      err.text().then((serverError) => {
        console.log(JSON.parse(serverError), `error message`);
      });
    } else {
      console.log("hard code error");
    }
  })


};
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

export const logout = () => {
    localStorage.removeItem("token");
}