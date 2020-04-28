import React, { Component } from 'react';

import Facebook from './SocialNetworks/Facebook';
import Google from './SocialNetworks/Google';

class LinkSocialNetworks extends Component {
    constructor(props) {
        super (props);

        this.state = {
            isLoggedIn: false,
            account: {}
        }
    }

    onLink = (data) => {
        if (data) {
            this.setState({
                isLoggedIn: true,
                account: data
            });
            this.props.onLinkSocialNetWorks(this.state.account);
        }
    }

    render() {
        return (
            <div>
                <hr />
                {/* <button className="btn btn-google btn-user btn-block" onClick={() => this.linkGoogle()}>
                    <i className="fa fa-google" /> Đăng nhập bằng Google
                </button> */}
                {/* <button className="btn btn-facebook btn-user btn-block" onClick={() => this.linkFacebook()}>
                    <i className="fa fa-facebook" /> Đăng nhập bằng Facebook
                </button> */}
                {/* <button className="btn btn-twitter btn-user btn-block" onClick={() => this.linkTwitter()}>
                    <i className="fa fa-twitter" /> Đăng nhập bằng Twitter
                </button> */}
                <Google onLink={this.onLink} />
                <br />
                <Facebook onLink={this.onLink} />
            </div>
        );
    }
}

export default LinkSocialNetworks;