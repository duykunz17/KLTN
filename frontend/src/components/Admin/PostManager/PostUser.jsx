import React, { Component } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';

import { MDBRow, MDBCol, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";

// import icons
import iconOnline from '../../Post/Icons/iconOnline.png';
import iconWaiting from '../../Post/Icons/iconWaiting.png';
import iconGray from '../../Post/Icons/iconGray.png';

export default class PostUser extends Component {

    showStatusOfPost = (status) => {
        let strStatus = "", icon = null;
        switch (status) {
            case 'A':
                strStatus = "Đã duyệt";
                icon = iconOnline;
                break;
            case 'D':
                strStatus = "Không được duyệt";
                icon = iconGray;
                break;
            case 'W': default:
                strStatus = "Đang duyệt";
                icon = iconWaiting;
                break;
        }
        return (
            <label>
                {strStatus} &nbsp;&nbsp; <img src={icon} alt='icon' />
            </label>
        )
    }

    onHandlingPost = (acctions) => {
        let text = '';
        if (acctions === 1)
            text = "Bạn muốn duyệt bài đăng này!";
        else if (acctions === 2)
            text = "Bạn muốn xóa bài đăng này!"
        Swal.fire({
            title: 'Bạn có chắc?',
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) this.props.onHandlingPostOfUser(this.props.currentPost, acctions);
        })
    }

    render() {
        let { currentPost } = this.props;
        return (
            <MDBCol lg="12" xl="12">
                <div className="d-flex">
                    <div className="info">
                        <div className="social_wrap d-flex align-items-center justify-content">
                            <div className="avatar">
                                <img src={currentPost.account.avatar} className="avatar" alt="ava" />
                            </div>
                                &nbsp;&nbsp;
                            <div className="number">
                                <span>
                                    <span style={{ fontWeight: 'bold', paddingRight: '130px', fontSize: '20px' }}>{currentPost.account.person.name}</span>

                                    <br />
                                    <Moment format="DD-MM-YYYY" style={{ fontSize: '20px' }}>
                                        {currentPost.postDate}
                                    </Moment>
                                    <span style={{ fontSize: '20px' }}>&nbsp;lúc&nbsp;</span>
                                    <Moment format="HH:mm:ss" style={{ fontSize: '20px' }}>
                                        {currentPost.postDate}
                                    </Moment>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-3 mb-2 d-flex justify-content" style={{ fontSize: '20px' }}>
                    {currentPost.content}
                </p>
                <p className="mt-3 mb-2 d-flex justify-content" style={{ fontSize: '20px' }}>
                    {currentPost.hashtag}
                </p>
                <MDBRow>
                    {currentPost.images.map((img, index) => {
                        if (currentPost.images.length === 1) {
                            return (
                                <MDBCol key={index} lg="12" md="12" className="mb-lg-0 mb-4">
                                    <MDBView hover className="rounded z-depth-2 mb-4" waves>

                                        <img
                                            className="img-fluid"
                                            src={img}
                                            alt=""
                                            width="100%" />

                                        <MDBMask overlay="white-slight" />
                                    </MDBView>
                                </MDBCol>
                            )
                        } else if (currentPost.images.length === 2) {
                            return (
                                <MDBCol key={index} lg="6" md="12" className="mb-lg-0 mb-4">
                                    <MDBView hover className="rounded z-depth-2 mb-4" waves>

                                        <img
                                            className="img-fluid"
                                            src={img}
                                            alt=""
                                            width="100%" />

                                        <MDBMask overlay="white-slight" />
                                    </MDBView>
                                </MDBCol>
                            )
                        } else {
                            return (
                                <MDBCol key={index} lg="4" md="12" className="mb-lg-0 mb-4">
                                    <MDBView hover className="rounded z-depth-2 mb-4" waves>

                                        <img
                                            className="img-fluid"
                                            src={img}
                                            alt=""
                                            width="100%" />

                                        <MDBMask overlay="white-slight" />
                                    </MDBView>
                                </MDBCol>
                            )
                        }
                    })}
                </MDBRow>
                <MDBCardBody>
                    <span className="mr-2">
                        <button><MDBIcon icon="heart" /></button> {currentPost.sumLike} thích
                    </span>

                    <span>
                        <MDBIcon icon="comment" /> {currentPost.comments.length} bình luận
                    </span>

                </MDBCardBody>
                <button className="btn btn-info" style={{marginRight: "15px"}} onClick={() => this.onHandlingPost(1)} > Duyệt bài </button>
                <button className="btn btn-danger" onClick={() => this.onHandlingPost(2)}> &nbsp;Xóa bài&nbsp; </button>
                <hr className="my-5" />
            </MDBCol>
            
        );
    }
}