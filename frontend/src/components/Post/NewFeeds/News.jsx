import React, { Component } from 'react';
import Moment from 'react-moment';

import { MDBCol, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";

// import callAPI from '../../utils/connectAPI';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sumLike: 0,
            sumComment: 0,
            account: null
        }
    }

    render() {
        let { currentPost } = this.props;
        return (
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                <MDBView hover className="rounded z-depth-2 mb-4" waves>
                    <img
                        className="img-fluid"
                        src={currentPost.images}
                        alt=""
                    />
                    <MDBMask overlay="white-slight" />
                </MDBView>
                <p>
                    <span>Tác giả: &nbsp;
                        <label className="font-weight-bold" style={{ fontWeight: "bold" }}> {currentPost.account.person.name} </label>
                    </span>
                    <br />
                    <span>Ngày đăng: &nbsp;
                        <label style={{ fontWeight: "bold" }}>
                            <Moment format="YYYY-MM-DD HH:mm:ss">
                                {currentPost.postDate}
                            </Moment>
                        </label>
                    </span>
                </p>
                <p className="dark-grey-text">
                    {currentPost.content}
                </p>

                <MDBCardBody>
                    <span className="mr-2">
                        <MDBIcon icon="heart" />
                        {currentPost.sumLike} thích
                    </span>
                    <span>
                        <MDBIcon icon="comment" />
                        {currentPost.sumComment} bình luận
                    </span>
                </MDBCardBody>
                <button className="btn btn-info"> Xem thêm </button>
                <hr className="my-5" />
            </MDBCol>
        );
    }
}