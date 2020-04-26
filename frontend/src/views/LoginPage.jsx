import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import components Login
import Login from '../components/Login/Login';
import LinkSocialNetworks from '../components/Login/LinkSocialNetworks';

class LoginPage extends Component {

    linkSoical = (link) => {
        console.log(link);
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic">
                            <img src="images/logo_login.jpg" alt="IMG" />
                        </div>

                        <div className="login100-form validate-form">
                            {/* component Login */}
                            <Login />

                            {/* component link to social networks */}
                            <LinkSocialNetworks linkSoical={this.linkSoical} />

                            <div className="text-center p-t-90">
                                <Link to='' className="txt2">
                                    Create your Account
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;