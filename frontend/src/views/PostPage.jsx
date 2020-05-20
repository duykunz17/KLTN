import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Post from '../components/Post/Post';
import Footer from '../components/Home/Footer';

class PostPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Post history={this.props.history}/>
                <Footer/>
            </div>
        );
    }
}

export default PostPage;