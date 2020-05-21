import React, { Component } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';


import { MDBRow, MDBCol, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";

// import callAPI from '../../../utils/connectAPI';

// import icons
import iconOnline from '../Icons/iconOnline.png';
import iconWaiting from '../Icons/iconWaiting.png';
import iconGray from '../Icons/iconGray.png';

export default class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sumLike: 0,
            statusLike: false,
        }
    }

    // addLike = (id) => {
    //     let { like } = this.state

    //     if (this.state.statusLike === false) {
    //         this.setState({
    //             like: like + 1,
    //             statusLike: true
    //         });
    //     } else {
    //         this.setState({
    //             like: like - 1,
    //             statusLike: false
    //         });
    //     }
    //     callAPI('post/update/' + id, 'POST', { like: this.state.like })
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => { console.log(err) })
    //     console.log(this.state.like);
    //     console.log(this.state.statusLike);


    // };

    componentDidMount() {
        let { currentPost } = this.props;

        // chạy for để kiểm tra có có like chưa
        this.setState({sumLike: currentPost.sumLike});
    }

    showStatusOfPost = (status) => {
        let strStatus = "", icon = null;
        switch (status) {
            case 'A':
                strStatus = "Đã duyệt";
                icon = iconOnline;
                break;
            case 'D':
                strStatus = "Đã xóa";
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

    onDeletePost = () => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn muốn xóa bài đăng này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) this.props.onDeletePost(this.props.currentPost._id);
        })
    }

    render() {
        let { currentPost } = this.props;
        let { sumLike } = this.state;
        return (
            <MDBCol lg="12" xl="12">
                <div className="d-flex">
                    <div style={{ float: "left", width: "95%", textAlign: "left" }}>
                        <p>
                            Đăng bởi: &nbsp;&nbsp; <strong> {currentPost.account.person.name} </strong>
                        </p>
                    </div>
                    <div style={{ float: "right", width: "50%", textAlign: "left" }}>
                        <p>
                            Trang thái: &nbsp; {this.showStatusOfPost(currentPost.status)}
                        </p>
                    </div>
                </div>
                <p className="d-flex">
                    Ngày đăng: &nbsp;&nbsp;
                    <Moment format="YYYY-MM-DD HH:mm:ss">
                        {currentPost.postDate}
                    </Moment>
                </p>
                <p className="d-flex">
                    {currentPost.content}
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
                        <button onClick={() => this.addLike(currentPost._id)}><MDBIcon icon="heart" /></button> {sumLike} thích
                    </span>

                    <span>
                        <MDBIcon icon="comment" /> {currentPost.sumComment} bình luận
                    </span>
                </MDBCardBody>
                <button className="btn btn-info" style={{marginRight: "15px"}}> Xem thêm </button>
                <button className="btn btn-danger" onClick={this.onDeletePost}> &nbsp;Xóa bài&nbsp; </button>
                <hr className="my-5" />
            </MDBCol>
        );
    }
}