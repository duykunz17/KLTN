import React, { Component } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";

import callAPI from '../../../utils/connectAPI';

// import icons
import iconOnline from '../Icons/iconOnline.png';
import iconWaiting from '../Icons/iconWaiting.png';
import iconGray from '../Icons/iconGray.png';

export default class PostPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInteraction: null,
            sumLike: 0,
            liked: false
        }
    }

    onSetState = (currentPost, account) => {
        // chạy for để kiểm tra có có like chưa
        let interactions = currentPost.interactions, liked = false, checkInteraction = null;
        if (interactions.length > 0 && account)
            interactions.forEach(item => {
                if (item.account)
                    if (item.account._id === account._id) {
                        checkInteraction = item._id;
                        liked = item.like;
                    }
            });
        this.setState({ checkInteraction, sumLike: currentPost.sumLike, liked });
    }

    componentDidMount() {
        let { currentPost, account } = this.props;
        this.onSetState(currentPost, account);
    }
    componentDidUpdate(prevState) {
        
        if (this.props.countPost !== prevState.countPost)
            // if (this.props.currentPost)
            this.loadAgainPostById(this.props.currentPost._id);
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
            if (result.value) this.props.onDeletePost(this.props.currentPost);
        })
    }

    loadAgainPostById = (post_id) => {
        callAPI('post/' + post_id, 'GET', null)
            .then(res => {
                let post = res.data.post;
                this.onSetState(post, this.props.account);
            })
    }

    actionsLike = (currentPost) => {
        let { checkInteraction, sumLike, liked } = this.state;
        let actions = 0;    // if 1 -> new like; 2 -> like again; 3 -> dislike
        if (!liked && checkInteraction === null)  // liked === false && checkInteraction == null -> user new like
            actions = 1;
        else                    // liked === true && checkInteraction !== null -> dislike
            if (!liked && checkInteraction)
                actions = 2;
            else if (liked && checkInteraction)
                actions = 3;

        let data = {}, path = '', getIdInteract = checkInteraction;
        if (actions === 1) {
            console.log('new like')
            path = 'post/newlike/';
            let interactions = { account: this.props.account, like: true };
            data = { interactions, sumLike: sumLike + 1 };
        }
        else if (actions === 2) {
            console.log('like again')
            path = 'post/likeagain/';
            let interactions = { getIdInteract, like: true };
            data = { interactions, sumLike: sumLike + 1 };
        }
        else if (actions === 3) {
            console.log('dislike')
            path = 'post/dislike/';
            let interactions = { getIdInteract, like: false };
            data = { interactions, sumLike: sumLike - 1 };
        }

        callAPI(path + currentPost._id, 'POST', data)
            .then(res => {
                if (res.data.result) {
                    if (actions === 3) {
                        sumLike--;
                        liked = false;
                    }
                    else {
                        sumLike++;
                        liked = true;
                    }

                    if (getIdInteract === null)
                        this.loadAgainPostById(currentPost._id);
                    else
                        this.setState({ sumLike, liked });
                }
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        let { currentPost } = this.props;
        let { sumLike } = this.state;
        let styleCSS = this.state.liked ? "red" : null;

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
                        <button onClick={() => this.actionsLike(currentPost)} style={{ color: styleCSS }} ><MDBIcon icon="heart" /></button> {sumLike} thích
                    </span>

                    <span>
                        <MDBIcon icon="comment" /> {currentPost.comments.length} bình luận
                    </span>
                </MDBCardBody>
                <Link to={'/post-detail/'+ currentPost._id} className="btn btn-info" style={{ marginRight: "15px" }}> Xem thêm </Link>
                <button className="btn btn-danger" onClick={this.onDeletePost}> &nbsp;Xóa bài&nbsp; </button>
                <hr className="my-5" />
            </MDBCol>
        );
    }
}