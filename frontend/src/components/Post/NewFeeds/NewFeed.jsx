import React, { Component } from 'react';

import { MDBRow, MDBCard, MDBCardBody } from "mdbreact";

export default class NewFeed extends Component {
    render() {
        return (
            <div className="popular_places_area">
                <div className="container">
                    <div className="row">
                        <MDBCard className="my-5 px-5 pb-5 w-100">

                            <MDBCardBody className="text-center">
                                <h2 className="text-center" style={{ fontWeight: 'bold', fontSize:'30px', color:'black' }}>
                                    Cộng đồng
                                </h2>
                                <hr/>
                                <MDBRow>

                                    {this.props.children}
                                    
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
        );
    }
}