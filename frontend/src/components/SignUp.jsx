import React, { Component } from 'react';
import Swal from 'sweetalert2';

import callAPI from '../utils/connectAPI';

class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name] : value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        if (user.password === user.confirmPassword) {
            callAPI('account/add', 'POST', {
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }).then(res =>{
                if (res.data.message){
                    Swal.fire({
                        icon: 'error',
                        title: res.data.message
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng ký tài khoản thành công',
                    })
                    document.getElementById('message').innerHTML = '';
                    this.setState({
                        name: '',
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: ''
                    });
                }
                
            }).catch(err => console.log(err))
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Mật khẩu không khớp. Hãy thử lại!';
        }
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <span className="login100-form-title">
                    Đăng ký tài khoản
                </span>
                <div className="wrap-input100 validate-input" data-validate="Họ tên là bắt buộc">
                    <input className="input100" type="text" name="name" placeholder="Họ tên" required
                        value={this.state.name}
                        onChange={(event) => this.onChange(event)}
                    />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-user-circle-o" aria-hidden="true" />
                    </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Email là bắt buộc">
                    <input className="input100" type="email" name="email" placeholder="Email" required
                        value={this.state.email}
                        onChange={(event) => this.onChange(event)}
                    />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Tài khoản là bắt buộc">
                    <input className="input100" type="text" name="username" placeholder="Tài khoản" required
                        value={this.state.username}
                        onChange={(event) => this.onChange(event)}
                    />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-user" aria-hidden="true" />
                    </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Mật khẩu là bắt buộc" > 
                    <input className="input100" type="password" name="password" placeholder="Mật khẩu" required
                        value={this.state.password}
                        onChange={(event) => this.onChange(event)}
                    />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Xác nhận mật khẩu là bắt buộc">
                    <input className="input100" type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu" required
                        value={this.state.confirmPassword}
                        onChange={(event) => this.onChange(event)}
                    />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-check-circle" aria-hidden="true" />
                    </span>
                </div>
                <span id="message"></span>
                <div className="container-login100-form-btn">
                    <button type="submit" className="login100-form-btn"> Đăng ký </button>
                </div>
            </form>
        );
    }
}

export default SignUp;