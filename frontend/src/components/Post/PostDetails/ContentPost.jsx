import React, { Component } from 'react';
import { MDBCol, MDBMask, MDBView, MDBRow } from "mdbreact";
import Swal from 'sweetalert2';

export default class ContentPost extends Component {

    displayListImages = (images) => {
        return images.map((img, index) => {
            if (images.length === 1) {
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
            } else if (images.length === 2) {
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
        })
    }

    actionsLike = (currentPost) => {
        let { account, checkIdInteraction, liked } = this.props;
        if (account) {
            let actions = 0;    // if 1 -> new like; 2 -> like again; 3 -> dislike
            if (!liked && checkIdInteraction === null)  // liked === false && checkIdInteraction == null -> user new like
                actions = 1;
            else                    // liked === true && checkIdInteraction !== null -> dislike
                if (!liked && checkIdInteraction)
                    actions = 2;
                else if (liked && checkIdInteraction)
                    actions = 3;

            let data = {}, path = '', getIdInteract = checkIdInteraction;
            if (actions === 1) {
                // console.log('new like')
                path = 'post/newlike/';
                let interactions = { account, like: true };
                data = { interactions, sumLike: currentPost.sumLike + 1 };
            }
            else if (actions === 2) {
                // console.log('like again')
                path = 'post/likeagain/';
                let interactions = { getIdInteract, like: true };
                data = { interactions, sumLike: currentPost.sumLike + 1 };
            }
            else if (actions === 3) {
                console.log('dislike')
                path = 'post/dislike/';
                let interactions = { getIdInteract, like: false };
                data = { interactions, sumLike: currentPost.sumLike - 1 };
            }

            this.props.onActionsLike(currentPost, path, data);
        }
        else
            Swal.fire({
                icon: 'warning',
                title: 'Bạn chưa thực hiện đăng nhập',
            })
    }
    render() {
        let { post, liked, sumComment } = this.props;
        // console.log(post);
        let styleCSS = liked ? "red" : null;
        return (
            <div className="single-post">
                <div className="feature-img">
                    <MDBCol lg="12" xl="12">
                        <MDBRow>
                            {this.displayListImages(post.images)}
                        </MDBRow>
                    </MDBCol>
                </div>
                <div className="blog_details">
                    <h2>
                        <ul className="blog-info-link mt-3 mb-4">
                            <li><i className="fa fa-user" /> {post.account.person.name} </li>
                            <li><i className="fa fa-comments" /> {sumComment} bình luận</li>
                            <li>
                                <button onClick={() => this.actionsLike(post)} style={{ color: styleCSS }} >
                                    <i className="fa fa-heart" /> {post.sumLike} thích
                                </button>
                            </li>
                        </ul>
                    </h2>
                    <p className="quote-wrapper">
                        {post.content}
                    </p>
                </div>
            </div>

        );
    }
}