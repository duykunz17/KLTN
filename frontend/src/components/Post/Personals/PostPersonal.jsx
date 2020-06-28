import React, { Component } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";

// import icons
import iconOnline from '../Icons/iconOnline.png';
import iconWaiting from '../Icons/iconWaiting.png';
import iconGray from '../Icons/iconGray.png';

import callAPI from '../../../utils/connectAPI';
// new
// import * as Config from '../../../constants/parameterConfig';

// import io from 'socket.io-client';
// const socket = io(Config.ENDPOINT_SOKET);

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

        // new
        // // ask connect socket.server
        // socket.emit('joinInteraction', { account, post_id: currentPost._id }, () => { });

        // // receive result
        // socket.on('interactivePost', post => {
        //     console.log('sumlike: ' + post.result.sumLike);
        //     this.onSetState(post.result, account);
        // })
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
            <label style={{ fontSize: '20px' }}>
                {strStatus} &nbsp; <img src={icon} alt='icon' />
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

                // if (isRealtime)
                //     socket.emit('interactiveAction', post);

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
            // console.log('new like');
            path = 'post/newlike/';
            let interactions = { account: this.props.account, like: true };
            data = { interactions, sumLike: sumLike + 1 };
        }
        else if (actions === 2) {
            // console.log('like again');
            path = 'post/likeagain/';
            let interactions = { getIdInteract, like: true };
            data = { interactions, sumLike: sumLike + 1 };
        }
        else if (actions === 3) {
            // console.log('dislike');
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
                    else {
                        this.setState({ sumLike, liked });

                        // new
                        // let post = currentPost;
                        // post.interactions.forEach((el, index) => {
                        //     if (el.account._id === this.props.account._id)
                        //         el.like = liked;

                        //     if (index === post.interactions.length - 1) {
                        //         post.sumLike = sumLike;
                        //         socket.emit('interactiveAction', post);
                        //     }
                        // });
                    }
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
                <p className="d-flex justify-content-end" style={{ fontSize: '20px' }}>Trạng thái: &nbsp; {this.showStatusOfPost(currentPost.status)}</p>
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
                <Link to={'/post-detail/' + currentPost._id} className="btn btn-info" style={{ marginRight: "15px" }}><i className="fa fa-info-circle" aria-hidden="true"></i> Xem thêm </Link>
                <button className="btn btn-danger" onClick={this.onDeletePost}><i className="fa fa-trash" aria-hidden="true"></i> Xóa bài </button>
                <hr className="my-5" />
            </MDBCol>
        );
    }
}