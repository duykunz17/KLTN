import React, { Component } from 'react';

// import login facebook
import FacebookLogin from 'react-facebook-login';

// call constant
import * as Config from '../../../constants/parameterConfig';

export default class Facebook extends Component {
    responseFacebook = (res) => {
        let account = {
            username: res.id,
            roles: 2,
            avatar: res.picture.data.url,
            person: {
                name: res.name,
                gender: false,
            }
        }
        this.props.onLink(account);
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId={ Config.API_FACEBOOK_ID }
                    // autoLoad={true}
                    fields="name, email, picture"
                    callback={this.responseFacebook}
                    cssClass="btn btn-facebook btn-user btn-block"
                    textButton ="&nbsp;&nbsp;Đăng nhập bằng Facebook"
                    icon={<i className="fa fa-facebook" />}
                />
            </div>
        );
    }
}