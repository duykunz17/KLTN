import React, { Component } from 'react';
import Header from '../components/Home/Header';
import PostDetail from '../components/Post/PostDetail';
import Footer from '../components/Home/Footer';

class PostDetailPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <PostDetail/>
                <Footer/>
            </div>
        );
    }
}

export default PostDetailPage;