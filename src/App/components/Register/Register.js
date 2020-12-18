import React, {useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterNewUser } from "../../../actions/auth";
import { useForm } from "react-hook-form";

import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [sucessful, setSuccesful] =useState(false);
  
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onBlur",
  });


  const { isLoggedIn } = useSelector((state) => state.auth);
  const {message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  // event change handler
  const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
  };

  const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
  };

  const onChangeConfPassword = (e) => {
      const confPassword = e.target.value;
      setConfPassword(confPassword);
  };


  const handleRegister = (e) => {

      setSuccesful(false);

      // validate form before sending to server
      // if valid, send to server
      const user = {email, password, confPassword}
      dispatch(RegisterNewUser(user))
        .then(() => {
            setSuccesful(true);
        })
        .catch(() => {
            setSuccesful(false);
        });
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
                  <i className="feather icon-user-plus auth-icon" />
                </div>
                <h3 className="mb-4">Sign up</h3>
                <form onSubmit={handleSubmit(handleRegister)}>
                  <div className="input-group mb-3">
                    <input
                      
                      className="form-control"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={onChangeEmail}
                      ref={register({
                        required: "Please enter your email address",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                    <div className="input-group ml-1" style={{fontSize: "12px"}}>
                    {errors.email && errors.email.message && (
                      <span className=" text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={onChangePassword}
                      ref={register({
                        required: "Enter your password",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/i,
                          message: "Use 8 or more characters with a mix of letters, numbers & symbols",
                        }
                      })}
                    />
                    <div className="input-group ml-1" style={{fontSize: "12px"}}>
                    {errors.password && errors.password.message && (
                      <span className="text-danger text-left">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      name="confirmpwd"
                      value={confPassword}
                      placeholder="Confirm"
                      onChange={onChangeConfPassword}
                      ref={register({
                        required: "Enter your password",
                        validate: value => value === password || "The password does not match."
                      })}
                    />
                    <div className="input-group ml-1" style={{fontSize: "12px"}}>
                    {errors.confirmpwd && errors.confirmpwd.message && (
                      <span className="text-danger">
                        {errors.confirmpwd.message}
                      </span>
                    )}
                  </div>
                  </div>
                  {/* feature not in use now*/}
                  {/* <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-2"
                        id="checkbox-fill-2"
                      />
                      <label htmlFor="checkbox-fill-2" className="cr">
                        Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a>{" "}
                        weekly.
                      </label>
                    </div>d
                  </div> */}
                    {message && (
                        <div className={sucessful ? "alert alert-success" : "alert alert-danger"}>{message}</div>
                    )}
                  <button className="btn btn-primary shadow-2 mb-4">
                    Sign up
                  </button>
                </form>
                <p className="mb-0 text-muted">
                  Allready have an account?{" "}
                  <NavLink to="/auth/signin">Login</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );

};

export default Register;


