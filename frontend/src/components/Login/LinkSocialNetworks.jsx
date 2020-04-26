import React, { Component } from 'react';

class LinkSocialNetworks extends Component {

    linkGoogle = () => {
        let link = "/google";
        this.props.linkSoical(link);
    }
    linkFacebook = () => {
        let link = "/facebooke";
        this.props.linkSoical(link);
    }
    linkTwitter = () => {
        let link = "/twitter";
        this.props.linkSoical(link);
    }

    render() {
        return (
            <div>
                <hr />
                <button className="btn btn-google btn-user btn-block" onClick={() => this.linkGoogle()}>
                    <i className="fa fa-google" /> Login with Google
                </button>
                <button className="btn btn-facebook btn-user btn-block" onClick={() => this.linkFacebook()}>
                    <i className="fa fa-facebook" /> Login with Facebook
                </button>
                <button className="btn btn-twitter btn-user btn-block" onClick={() => this.linkTwitter()}>
                    <i className="fa fa-twitter" /> Login with Twitter
                </button>
            </div>
        );
    }
}

export default LinkSocialNetworks;