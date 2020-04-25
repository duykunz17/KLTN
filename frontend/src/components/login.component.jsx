import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
          <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic">
                <img src="images/logo_login.jpg" alt="IMG" />
              </div>
              <form className="login100-form validate-form">
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
                  <button className="login100-form-btn">
                    Login
                  </button>
                </div>
                <div className="text-center p-t-12">
                  <a className="txt" href>
                    Forgot Password?
                  </a>
                </div>
                <div>
                  <hr />
                  <a href="index.html" className="btn btn-google btn-user btn-block">
                    <i className="fa fa-google" /> Login with Google
                  </a>
                  <a href="index.html" className="btn btn-facebook btn-user btn-block">
                    <i className="fa fa-facebook" /> Login with Facebook
                  </a>
                  <a href="index.html" className="btn btn-twitter btn-user btn-block">
                    <i className="fa fa-twitter" /> Login with Twitter
                  </a>
                </div>
                <div className="text-center p-t-90">
                  <a className="txt2" href>
                    Create your Account
                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>        
        );
    }
}

export default Login;