import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Schedule from '../components/Schedule/Schedule';
import Footer from '../components/Home/Footer';

class SchedulePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Schedule/>
                <Footer/>
            </div>
        );
    }
}

export default SchedulePage;