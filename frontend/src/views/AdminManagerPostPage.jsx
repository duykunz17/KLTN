import React, { Component } from 'react';
import Swal from 'sweetalert2';

import HeaderAdmin from '../components/Admin/HeaderAdmin';
import Footer from '../components/Home/Footer';

import ListPostUser from '../components/Admin/PostManager/ListPostUser';
import PostUser from '../components/Admin/PostManager/PostUser';

import * as Config from '../constants/parameterConfig';
import callAPI from '../utils/connectAPI';

import io from 'socket.io-client';
const socket = io(Config.ENDPOINT_SOKET);
export default class AdminMangerPostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            account: null
        }
    }

    getListPostsOfUser = () => {
        callAPI('admin/post/', 'GET', null)
            .then(res => {
                this.setState({ posts: res.data });
            }).catch((err) => { console.log(err) })
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        if (account !== null) {

            // Is this account an admin ?
            this.setState({ account });
            this.getListPostsOfUser();

            // ask connect socket.server
            socket.emit('joinAdmin', { account }, () => {});

            // receive result
            socket.on('receivePost', post => {
                if (post.result)
                    this.getListPostsOfUser();
            })
        }
        else {
            let history = this.props.history;
            history.push('/login');
        }
    }

    onHandlingPostOfUser = (post, acctions) => {
        /**
         * if acctions === 1 then accepted
         * else acctions === 2 then don't accepted
        */
        let path = '', method = '', status = '';
        if (acctions === 1) {
            path = 'admin/post/update/';
            method = 'GET';
            status = 'A';
        }
        else if (acctions === 2) {
            path = 'admin/post/';
            method = 'DELETE';
            status = 'D';
        }
        callAPI(path + post._id, method, null)
            .then(res => {
                if (res.data.message) {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                    })
                    this.setState({ posts: this.state.posts.filter(el => el._id !== post._id) });

                    post.status = status;
                    socket.emit('handlingPost', post, () => {});
                }
            }).catch((err) => { console.log(err) })
    }

    displayListPostByUser = (posts) => {
        let result = null;
        if (posts.length > 0)
            result = posts.map((currentPost, index) => {
                return (
                    <PostUser
                        key={index}
                        currentPost={currentPost}
                        onHandlingPostOfUser={this.onHandlingPostOfUser}
                    />
                )
            });
        return result;
    }

    render() {
        let { posts } = this.state;
        return (
            <div>
                <HeaderAdmin />

                <div className="where_togo_area">
                    <div className="row justify-content-center">
                        <div className="container">
                            <h2 style={{ color: 'white', textAlign: 'center', textTransform: "uppercase" }}>Quản lý bài đăng</h2>
                        </div>
                    </div>
                </div>

                <div className="popular_places_area">
                    <div className="container">
                        <div className="row">

                            <ListPostUser>
                                {this.displayListPostByUser(posts)}
                            </ListPostUser>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}