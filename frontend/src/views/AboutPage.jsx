import React, { Component } from 'react';
import Header from '../components/Home/Header';
import About from '../components/About';
import Footer from '../components/Home/Footer';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <About/>
                <Footer/>
            </div>
        );
    }
}

export default AboutPage;