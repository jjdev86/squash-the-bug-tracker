import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import * as actionTypes from '../../../store/actions';

import {fetchUser} from './UserActions';


class SignUp1 extends React.Component {

    state = {
        email: "",
        password: ""
    }

    handleInputChange = (e) => {
        e.persist();
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.fetchUser(this.state)
    }


    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <form onSubmit={this.onSubmit}>
                                <div className="input-group mb-3">
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="password"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4">Login</button>
                                </form>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (userInfo) => dispatch(fetchUser(userInfo))
    }
};

// component only needs to send dispatch to the store, 
export default connect(null, mapDispatchToProps) (SignUp1);