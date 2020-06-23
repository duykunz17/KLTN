import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Gallery from '../components/Gallery/Gallery';

class GalleryPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Gallery/>
                <Footer />
            </div>
        );
    }
}

export default GalleryPage;