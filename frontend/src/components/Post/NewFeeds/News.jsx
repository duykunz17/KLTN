import React, { Component } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MDBCol, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";

import callAPI from '../../../utils/connectAPI';

export default class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: null,
            checkInteraction: null,
            sumLike: 0,
            liked: false
        }
    }

    onSetSate = (currentPost, account) => {
        let interactions = currentPost.interactions, liked = false, checkInteraction = null;
        if (interactions.length > 0 && account)
            interactions.forEach(item => {
                if (item.account._id === account._id) {
                    checkInteraction = item._id;
                    liked = item.like;
                }
            });

        this.setState({ account, checkInteraction, sumLike: currentPost.sumLike, liked });
    }

    componentDidMount() {
        let { currentPost, account } = this.props;
        this.onSetSate(currentPost, account);
    }

    loadAgainPostById = (post_id) => {
        callAPI('post/' + post_id, 'GET', null)
            .then(res => {
                let post = res.data.post;
                this.onSetSate(post, this.state.account);
            })
    }

    actionsLike = (currentPost) => {
        let { account, checkInteraction, sumLike, liked } = this.state;
        if (account) {
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
                // console.log('new like')
                path = 'post/newlike/';
                let interactions = { account, like: true };
                data = { interactions, sumLike: sumLike + 1 };
            }
            else if (actions === 2) {
                // console.log('like again')
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
        else
            Swal.fire({
                icon: 'warning',
                title: 'Bạn chưa thực hiện đăng nhập',
            })
    }

    render() {
        let { currentPost } = this.props;
        let styleCSS = this.state.liked ? "red" : null;
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
                        <button onClick={() => this.actionsLike(currentPost)} style={{ color: styleCSS }} >
                            <MDBIcon icon="heart" />
                        </button> {this.state.sumLike} thích
                    </span>
                    <span>
                        <MDBIcon icon="comment" />
                        {currentPost.comments.length} bình luận
                    </span>
                </MDBCardBody>
                <Link to={'/post-detail/'+ currentPost._id} className="btn btn-info" style={{ marginRight: "15px" }}> Xem thêm </Link>
                <hr className="my-5" />
            </MDBCol>
        );
    }
}