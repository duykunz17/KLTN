import React, { Component } from 'react';
import Swal from 'sweetalert2';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import ListPostPersonal from '../components/Post/Personals/ListPostPersonal';
import PostPersonal from '../components/Post/Personals/PostPersonal';
import FormPost from '../components/Post/Personals/FormPost';

import * as Config from '../constants/parameterConfig';
import callAPI from '../utils/connectAPI';

import io from 'socket.io-client';
const socket = io(Config.ENDPOINT_SOKET);

export default class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            account: null,
            countPost: 0        // use to init this.state in componentDidUpdate
        }
    }

    getPostsOfAccount = (account) => {
        callAPI('post/account/' + account._id, 'GET', null)
            .then(res => {
                this.setState({ posts: res.data, countPost: this.state.countPost + 1 });
            }).catch((err) => { console.log(err) })
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        if (account !== null) {
            this.setState({ account });
            this.getPostsOfAccount(account);

            // ask connect socket.server
            socket.emit('joinAdmin', { account }, () => {});

            // receive result
            socket.on('resultHandling', post => {
                let posts = this.state.posts.map(el => {
                    if (el._id === post.result._id)
                        el = post.result;
                    return el;
                })
                this.setState({ posts, countPost: this.state.countPost + 1 });
            })
        }
        else {
            let history = this.props.history;
            history.push('/login');
        }
    }

    onDeletePost = (post) => {
        callAPI('post/' + post._id, 'DELETE', null)
            .then(res => {
                if (res.data.message) {
                    let { posts, countPost } = this.state;
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                    })
                    this.setState({ posts: posts.filter(el => el._id !== post._id), countPost: countPost - 1 });

                    if (post.state !== 'W')
                        socket.emit('submitPost', post, () => {});
                }
            }).catch((err) => { console.log(err) })
    }

    displayListPostByUser = (posts) => {
        let result = null;
        if (posts.length > 0)
            result = posts.map((currentPost, index) => {
                return (
                    <PostPersonal
                        key={index}
                        currentPost={currentPost}
                        account={this.state.account}
                        onDeletePost={this.onDeletePost}
                        countPost={this.state.countPost}
                    />
                )
            });
        return result;
    }

    onSavePost = (post) => {
        post.account = this.state.account;

        callAPI('post/add', 'POST', post)
            .then(res => {
                if (res.data.result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Bài đã đăng thành công',
                    })
                    
                    post.interactions = []; post.comments = []; post.sumLike = 0;
                    socket.emit('submitPost', post, () => {});

                    this.getPostsOfAccount(this.state.account);
                }
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        let { posts, countPost } = this.state;
        return (
            <div>
                <Header />

                <div className="popular_places_area">
                    <div className="container">
                        <div className="row">

                            {/* Form use to post */}
                            <FormPost onSavePost={this.onSavePost} countPost={countPost} />

                            <ListPostPersonal>
                                {this.displayListPostByUser(posts)}
                            </ListPostPersonal>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}