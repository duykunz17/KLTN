import React, { Component } from 'react';
import Header from '../components/Home/Header';
import NewFeed from '../components/Post/NewFeed';
import Footer from '../components/Home/Footer';

class NewFeedPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <NewFeed/>
                <Footer/>
            </div>
        );
    }
}

export default NewFeedPage;