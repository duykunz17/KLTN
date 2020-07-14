import React, { Component } from 'react';
import Swal from 'sweetalert2';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Search from '../components/Home/Search/Search';

import NewFeed from '../components/Post/NewFeeds/NewFeed';
import News from '../components/Post/NewFeeds/News';

import RecentTrip from '../components/RecentTrip';

import callAPI from '../utils/connectAPI';

import * as Config from '../constants/parameterConfig';
import io from 'socket.io-client';
const socket = io(Config.ENDPOINT_SOKET);

class NewFeedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            postsPopular: []
        }
    }

    componentDidMount() {
        callAPI('post', 'GET', null)
            .then(res => {
                this.setState({
                    posts: res.data
                });
            })
            .catch((err) => { console.log(err) })

        callAPI('post/post-popular', 'GET', null)
            .then(res => {
                if (res.data !== null)
                    this.setState({
                        postsPopular: res.data
                    });
            })
            .catch((err) => { console.log(err) });

        let account = JSON.parse(sessionStorage.getItem("user"));
        // ask connect socket.server
        socket.emit('joinAdmin', { account }, () => { });

        // receive result when admin has handled a post
        socket.on('haveHandledPost', post => {
            let p = post.result;
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                icon: 'info',
                title: p.account.person.name + ' đã chia sẻ cảm nghĩ'
            })
        });
    }

    showPostPopular = (postsPopular) => {
        let result = null;
        if (postsPopular.length > 0) {
            result = postsPopular.map((currentPost, index) => {
                return (
                    <RecentTrip
                        key={index}
                        post={currentPost}
                    />
                );
            });
        }
        return result;
    }

    displayListNews = (posts) => {
        if (posts.length > 0)
            return posts.map((currentPost, index) => {
                return (
                    <News key={index} currentPost={currentPost} />
                )
            })
    }

    receiveInfoSearch = (infoSearch) => {
        if (infoSearch)
            callAPI(`post/search=${infoSearch}`, 'GET', null)
                .then(res => {
                    if (res.data.message)
                        Swal.fire({
                            icon: 'warning',
                            title: res.data.message,
                        });

                    else {
                        let { posts } = res.data;
                        this.setState({ posts });
                    }
                })
                .catch((err) => { console.log(err) });
        else {
            callAPI('post', 'GET', null)
                .then(res => {
                    this.setState({
                        posts: res.data
                    });
                })
                .catch((err) => { console.log(err) })
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Search receiveInfoSearch={this.receiveInfoSearch} title="Bạn muốn tìm bài viết về?" input="Nhập thông tin bài viết" />
                {
                    this.state.postsPopular.length > 0 ? (

                        <div className="recent_trip_area">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">
                                        <div className="section_title text-center mb_70">
                                            <h2 style={{ fontWeight: 'bold', fontSize: '30px', color: 'black' }} > Bài đăng nổi bật </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {this.showPostPopular(this.state.postsPopular)}
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                <NewFeed>
                    {this.displayListNews(this.state.posts)}
                </NewFeed>
                <Footer />
            </div>
        );
    }
}

export default NewFeedPage;