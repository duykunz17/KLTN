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
                                <h2 className="h1-responsive font-weight-bold text-center my-5">
                                    New feed
                                </h2>
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