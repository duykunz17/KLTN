import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import ContentPost from '../components/Post/PostDetails/ContentPost';
import ListComments from '../components/Post/PostDetails/ListComments';
import FormComment from '../components/Post/PostDetails/FormComment';

import * as Config from '../constants/parameterConfig';
import callAPI from './../utils/connectAPI';

import io from 'socket.io-client';
const socket = io(Config.ENDPOINT_SOKET);

export default class PostDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            account: null,
            checkIdInteraction: null,
            liked: false,
            comments: []
        }
    }

    onSetState = (currentPost, account) => {
        // chạy for để kiểm tra có có like chưa
        let interactions = currentPost.interactions, liked = false, checkIdInteraction = null;
        if (interactions.length > 0 && account)
            interactions.forEach(item => {
                if (item.account)
                    if (item.account._id === account._id) {
                        checkIdInteraction = item._id;
                        liked = item.like;
                    }
            });
        this.setState({post: currentPost, account, checkIdInteraction, liked, comments: currentPost.comments });
    }

    loadAgainPostById = (post_id) => {
        callAPI('post/' + post_id, 'GET', null)
            .then(res => {
                let post = res.data.post;
                this.onSetState(post, this.state.account)
            })
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user")), post_id = this.props.match.params.id;
        if (account)
            this.setState({ account });
        this.loadAgainPostById(post_id);

        socket.emit('joinDetailPost', { account, post_id }, () => {});

        socket.on('comment', comment => {
            this.setState({ comments: [...this.state.comments, comment.result]});
        });
    }

    onActionsLike = (currentPost, path, data) => {
        callAPI(path + currentPost._id, 'POST', data)
            .then(res => {
                if (res.data.result) {
                    this.loadAgainPostById(currentPost._id);
                }
            })
            .catch((err) => { console.log(err) })
    }

    onSubmitComment = (content) => {
        let {post, account} = this.state;
        let comment = {account, content};

        callAPI('post/comments/' + post._id, 'POST', comment)
            .then(res => {
                if (res.data.result) {
                    socket.emit('sendComment', comment, () => {});
                }
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        let { post, account, checkIdInteraction, liked, comments } = this.state;
        if (post) {
            let sumComment = (comments.length > 10 || comments.length === 0) ? comments.length : '0'+comments.length;
            return (
                <div>
                    <Header />
                    
                    <div className="blog_area single-post-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 posts-list">
                                    {/* content post */}
                                    <ContentPost post={post} account={account} liked={liked} sumComment={sumComment}
                                        checkIdInteraction={checkIdInteraction} onActionsLike={this.onActionsLike} />

                                    {/* List comments of user */}
                                    <ListComments sumComment={sumComment} comments={comments} />

                                    {/* Form bình luận */}
                                    <FormComment account={account} onSubmitComment={this.onSubmitComment} />
                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            );
        }
        return null;
    }
}