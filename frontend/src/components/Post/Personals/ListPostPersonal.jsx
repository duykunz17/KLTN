import React, { Component } from 'react';

import { MDBRow, MDBCard, MDBCardBody, } from "mdbreact";

export default class Personal extends Component {

    render() {
        return (
            <MDBCard className="my-5 px-5 pb-5 w-100">

                <MDBCardBody className="text-center">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Bài đăng gần đây
                    </h2>
                    <MDBRow>

                        {this.props.children}

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        );
    }
}