import React, { Component } from 'react';

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({user});
    }

    render() {
        let { user } = this.state;
        return (
            <div className="col-sm-6">
                <div className="well">
                    <h3 className="text-primary">Info</h3>
                    <p>
                        <strong>Username</strong>:  {user.username}    <br/>
                        <strong>Roles</strong>:   {user.roles}   <br/>
                        <strong>Name</strong>:   {user.person.name}   <br/>
                        <strong>Email</strong>:   {user.person.email}   <br/>
                    </p>
                </div>
            </div>
        );
    }
}