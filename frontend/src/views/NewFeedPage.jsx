import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import NewFeed from '../components/Post/NewFeeds/NewFeed';
import News from '../components/Post/NewFeeds/News';

import callAPI from '../utils/connectAPI';

class NewFeedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
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
                <NewFeed>
                    { this.displayListNews(this.state.posts) }
                </NewFeed>
                <Footer/>
            </div>
        );
    }
}

export default NewFeedPage;