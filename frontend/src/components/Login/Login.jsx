import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name] : value
        });
    };

    onSave = (event) => {
        event.preventDefault();
        var { username, password } = this.state;

        let checkUsername = false, checkPass = false;

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

        if (checkUsername && checkPass)
            this.props.onLogin(username, password);
    }

    render() {
        var { username, password } = this.state;
        return (
            <form onSubmit={this.onSave} >
                <span className="login100-form-title">
                    Đăng nhập
                </span>
                <div className="wrap-input100 validate-input">
                    <input className="input100" type="text" name="username" placeholder="Tài khoản"
                        onChange={this.onChange} value={username}
                    />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-user" aria-hidden="true" />
                    </span>
                </div>
                <span id="errUsername"></span>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" name="password" placeholder="Mật khẩu"
                        onChange={this.onChange} value={password}
                    />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                </div>
                <span id="errPass"></span>

                <div className="container-login100-form-btn">
                    <button type="submit" className="login100-form-btn"> Đăng nhập </button>
                </div>
                <div className="text-center p-t-8">
                    <Link className="txt" to='/'>
                        Quên mật khẩu?
                    </Link>
                </div>
            </form>
        );
    }
}

export default Login;