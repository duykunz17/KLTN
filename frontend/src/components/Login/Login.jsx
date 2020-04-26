import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    render() {
        return (
            <form>
                <span className="login100-form-title">
                    Welcome Back
                </span>
                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <input className="input100" type="text" name="email" placeholder="Email" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" name="pass" placeholder="Password" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                </div>
                <div className="container-login100-form-btn">
                    <button className="login100-form-btn"> Login </button>
                </div>
                <div className="text-center p-t-12">
                    <Link className="txt" to='/'>
                        Forgot Password?
                    </Link>
                </div>
            </form>
        );
    }
}

export default Login;