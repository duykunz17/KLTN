import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import callAPI from './../utils/connectAPI';

// import components Login
import Login from '../components/Login/Login';
import LinkSocialNetworks from '../components/Login/LinkSocialNetworks';

export default class LoginPage extends Component {

    componentWillMount() {
        if (sessionStorage.getItem("user")) {
            let { history } = this.props;
            return history.push('/info');
        }
    }

    onLogin = async (username, password) => {
        console.log(username + ' - ' + password);
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
                else{
                    sessionStorage.setItem("user", JSON.stringify(res.data.user));
                    //this.props.history.push('/homepage');
                    window.location.href = '/homepage';
                }   
            })
    }

    onLinkSocialNetWorks = async (data) => {
        let { history } = this.props;
        await callAPI('account/login-social', 'POST', data)
            .then(res => {
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                history.push('/info');
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
                                <Link to='' className="txt2">
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