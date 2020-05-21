import React, { Component } from 'react';
import Swal from 'sweetalert2';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import ListPostPersonal from '../components/Post/Personals/ListPostPersonal';
import PostPersonal from '../components/Post/Personals/PostPersonal';
import FormPost from '../components/Post/Personals/FormPost';



import callAPI from '../utils/connectAPI';

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
                this.setState({ posts: res.data });
            }).catch((err) => { console.log(err) })
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        if (account !== null) {
            this.setState({ account });
            this.getPostsOfAccount(account);
        }
        else {
            let history = this.props.history;
            history.push('/login');
        }
    }

    onDeletePost = (post_id) => {
        callAPI('post/' + post_id, 'DELETE', null)
            .then(res => {
                if (res.data.message) {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                    })
                    console.log(this.state.posts.filter(el => el._id !== post_id))
                    this.setState({ posts: this.state.posts.filter(el => el._id !== post_id) });
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
                        onDeletePost={this.onDeletePost}
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
                    this.setState({ countPost: this.state.countPost + 1 });
                    this.getPostsOfAccount(this.state.account)
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