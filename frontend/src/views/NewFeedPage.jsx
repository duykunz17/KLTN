import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import NewFeed from '../components/Post/NewFeeds/NewFeed';
import News from '../components/Post/NewFeeds/News';

import RecentTrip from '../components/RecentTrip';

import callAPI from '../utils/connectAPI';
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
            .catch((err) => { console.log(err) })
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

    render() {
        return (
            <div>
                <Header/>

                {
                    this.state.postsPopular.length > 0 ? (

                        <div className="recent_trip_area">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">
                                        <div className="section_title text-center mb_70">
                                            <h2 style={{ fontWeight: 'bold', fontSize:'30px', color:'black' }} > Bài đăng nổi bật </h2>
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
                    { this.displayListNews(this.state.posts) }
                </NewFeed>
                <Footer/>
            </div>
        );
    }
}

export default NewFeedPage;