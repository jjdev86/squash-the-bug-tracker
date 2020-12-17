import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

import { login } from "../../../actions/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onBlur",
  });
  // redux dispatch
  const dispatch = useDispatch();

  // form validation
  const onSubmit = (data) => console.log(data);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    // e.preventDefault();

    setLoading(true);

    // validate form fields

    // if no errors
    let userInfo = { email, password };
    if (userInfo) {
      dispatch(login(userInfo))
        .then(() => {
          props.history.push("/dashboard");
        })
        .catch(() => {
          setLoading(false);
          setPassword('');
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              {message && <div className="alert alert-danger">{message}</div>}
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="input-group mb-3">
                  <input
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    className="form-control"
                    placeholder="Email"
                    ref={register({
                      required: "Please enter your email address",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  <div className="input-group ml-1">
                    {errors.email && errors.email.message && (
                      <span className=" text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="input-group mb-4">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    className="form-control"
                    placeholder="password"
                    ref={register({
                      required: "Enter your password",
                    })}
                  />
                  <div className="input-group ml-1">
                    {errors.password && errors.password.message && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input
                      type="checkbox"
                      name="checkbox-fill-1"
                      id="checkbox-fill-a1"
                    />
                    <label htmlFor="checkbox-fill-a1" className="cr">
                      {" "}
                      Save credentials
                    </label>
                  </div>
                </div> */}
                
                <button className="btn btn-primary shadow-2 mb-4">
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Login
                </button>
              </form>
              <p className="mb-2 text-muted">
                Forgot password?{" "}
                <NavLink to="/auth/reset-password-1">Reset</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account?{" "}
                <NavLink to="/auth/signup">Signup</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Login;
