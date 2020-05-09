import React, { Component } from 'react';

// import login google
import GoogleLogin from 'react-google-login';

// call constant
import * as Config from '../../../constants/parameterConfig';

export default class Google extends Component {

    responseGoogle = (res) => {
        let profile = res.profileObj;
        let account = {
            username: profile.googleId,
            roles: 2,
            avatar: profile.imageUrl,
            person: {
                name: profile.name,
                gender: false,
                email: profile.email
            }
        }
        this.props.onLink(account);
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId={ Config.API_GOOGLE_ID }
                    onSuccess={this.responseGoogle}
                    className="btn btn-google btn-user btn-block"
                >
                    <span >&nbsp;&nbsp;Đăng nhập bằng Google</span>
                </GoogleLogin>
            </div>
        );
    }
}