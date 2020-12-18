// login user
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/'

 const login = ({email, password}) => {

  return axios.post(API_URL + 'login', {
    email,
    password
  });

  //  return fetch("/api/login", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   },
  //   body: JSON.stringify(userInfo)
  // })

};
// create new user

const register = ({email, password, confPassword}) => {
  return axios.post(API_URL + 'sign-up', {
    email,
    password,
    confPassword
  });

};

//  const register = (userInfo) => {
//   fetch('/api/sign-up', {
//     method: "POST",
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//     },
//     body: JSON.stringify(userInfo)
//   })
//   .then(res => {
//     if (!res.ok) {
//       if (res.status === 409 || res.status === 500 || res.status === 400) {
//         throw res;
//       }
//     } else {
//       return res.json();
//     }
//   })
//   .then(data => {
//     localStorage.setItem("token", data.token);
//     // dispatch({type: actionTypes.SET_USER, payload: data.user});
//     return data;
//     // history.push('/dashboard');
//   })
//   .catch(err => {
//     if (err.status)
//     if (err.text) {
//       err.text().then((serverError) => {
//         console.log(JSON.parse(serverError), `error message`);
//       });
//     } else {
//       console.log("hard code error");
//     }
//   })


// };
// keep user login
 const autoLogin = () => (dispatch) => {
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

 const logout = () => {
    localStorage.removeItem("token");
}

export default {
  register,
    login,
    logout
}