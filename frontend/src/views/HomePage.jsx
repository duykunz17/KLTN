import React, { Component } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Search from '../components/Search';
import PopularPlaces from '../components/PopularPlaces';
import Utilities from '../components/Utilities';
import RecentTrip from '../components/RecentTrip';
import Footer from '../components/Footer';
class HomePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Banner/>
                <Search/>
                <PopularPlaces/>
                <Utilities/>
                <RecentTrip/>
                <Footer/>
            </div>
        );
    }
}

export default HomePage;