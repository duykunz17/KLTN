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

        var { name, email, username, password, confirmPassword } = this.state;

        let checkName = false, checkEmail = false, checkUsername = false, checkPass = false, checkConPass = false;
        if (name !== '') {
            checkName = true;
            document.getElementById('errName').innerHTML = '';
        }
        else {
            document.getElementById('errName').style.color = 'red';
            document.getElementById('errName').innerHTML = 'Tên không được rỗng.';
        }

        let rexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email === '') {
            document.getElementById('errEmail').style.color = 'red';
            document.getElementById('errEmail').innerHTML = 'Email không được rỗng.';
        }
        else if (!rexEmail.test(email)) {
            document.getElementById('errEmail').style.color = 'red';
            document.getElementById('errEmail').innerHTML = 'Email không hợp lệ. Hãy thử lại!';
        }
        else {
            checkEmail = true;
            document.getElementById('errEmail').innerHTML = '';
        }

        if (username !== '') {
            checkUsername = true;
            document.getElementById('errUsername').innerHTML = '';
        }
        else {
            document.getElementById('errUsername').style.color = 'red';
            document.getElementById('errUsername').innerHTML = 'Tài khoản không được rỗng.';
        }

        if (password !== '') {
            checkPass = true;
            document.getElementById('errPass').innerHTML = '';
        }
        else {
            document.getElementById('errPass').style.color = 'red';
            document.getElementById('errPass').innerHTML = 'Mật khẩu không được rỗng.';
        }

        if (password === confirmPassword) {
            checkConPass = true;
            document.getElementById('errConPass').innerHTML = '';
        } else {
            document.getElementById('errConPass').style.color = 'red';
            document.getElementById('errConPass').innerHTML = 'Mật khẩu không khớp.';
        }

        if (checkName && checkEmail && checkUsername && checkPass && checkConPass) {
            callAPI('account/add', 'POST', { name, email, username, password })
                .then(res =>{
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
                        this.setState({
                            name: '',
                            email: '',
                            username: '',
                            password: '',
                            confirmPassword: ''
                        });
                    }
                }).catch(err => console.log(err))
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
                <span id="errName"></span>

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
                <span id="errEmail"></span>

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
                <span id="errUsername"></span>

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
                <span id="errPass"></span>

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
                <span id="errConPass"></span>

                <div className="container-login100-form-btn">
                    <button type="submit" className="login100-form-btn"> Đăng ký </button>
                </div>
            </form>
        );
    }
}

export default SignUp;