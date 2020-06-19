import React, { Component } from 'react';

import { MDBRow, MDBCardBody } from "mdbreact";

export default class ListPostUser extends Component {

    render() {
        return (
            <div className="card my-5 px-5 pb-5 w-100" style={{borderRadius:'10px'}}>
                <MDBCardBody className="text-center">
                    <p className=" text-center" style={{ fontWeight: 'bold', fontSize:'30px', color:'black' }}>
                        Bài đăng
                    </p>
                    <hr/>
                    <MDBRow>
                        {this.props.children}
                    </MDBRow>
                </MDBCardBody>
            </div>
        );
    }
}