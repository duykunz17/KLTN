import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import callAPI from './../utils/connectAPI';

// import components Login
import Login from '../components/Login/Login';
import LinkSocialNetworks from '../components/Login/LinkSocialNetworks';

export default class LoginPage extends Component {

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"))
        if (user)
            this.redirectHome(user);
    }

    redirectHome = (user) => {
        if (user.roles === 2)
            return window.location = '/'
        else if (user.roles === 1)
            return window.location = '/admin/product-management'
    }

    onLogin = async (username, password) => {
        await callAPI('account/login-local', 'POST', {username, password})
            .then(res => {
                // check if there's a message or not?
                if (res.data.message){
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng nhập không thành công',
                        text: res.data.message,
                    })
                }
                else {
                    let user = res.data.user;
                    sessionStorage.setItem("user", JSON.stringify(user));
                    this.redirectHome(user);
                }   
            })
    }

    onLinkSocialNetWorks = async (data) => {
        await callAPI('account/login-social', 'POST', data)
            .then(res => {
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                this.redirectHome();
            })
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic">
                            <img src="images/logo_login.jpg" alt="IMG" />
                        </div>

                        <div className="login100-form validate-form" style={{marginTop:'10px'}}>
                            {/* component Login */}
                            <Login onLogin={this.onLogin} />

                            {/* component link to social networks */}
                            <LinkSocialNetworks onLinkSocialNetWorks={this.onLinkSocialNetWorks} />

                            <div className="text-center p-t-20">
                                <Link to='/sign-up' className="txt2">
                                    Đăng ký
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