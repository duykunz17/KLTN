import React, { Component } from 'react';
import SignUp from '../components/SignUp';

class SignUpPage extends Component {
    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic">
                            <img src="images/logo_login.jpg" alt="IMG" />
                        </div>

                        <div className="login100-form validate-form" style={{marginTop:'30px'}}>
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;