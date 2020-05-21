import React, { Component } from 'react';

import Header from '../components/Home/Header';
import Search from '../components/Home/Search/Search';
import Footer from '../components/Home/Footer';

import Banner from '../components/Banner';
import Utilities from '../components/Utilities';
import RecentTrip from '../components/RecentTrip';

import PopularPlaces from '../components/Places/PopularPlaces';
import Place from '../components/Places/Place';

import callAPI from '../utils/connectAPI';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        callAPI('place/popular-place', 'GET', null)
            .then(res => {
                this.setState({
                    places: res.data
                })
                //console.log(res.data);
            })
            .catch((err) => { console.log(err) })
    }

    receiveInfoSearch = (infoSearch) => {
        console.log(infoSearch);
    }

    render() {
        var { places } = this.state;
        return (
            <div className="HomePage">
                <Header/>
                <Banner />
                <Search receiveInfoSearch={this.receiveInfoSearch} title="Bạn muốn đi đâu?" input="Nhập tên địa điểm"/>
                <PopularPlaces>
                    { this.showPlaces(places) }
                </PopularPlaces>
                <Utilities/>
                <RecentTrip/>
                <Footer/>
            </div>
        );
    }

    showPlaces = (places) => {
        let result = null;
        if (places.length > 0) {
            result = places.map((currentPlace, index) => {
                return (
                    <Place
                        key={index}
                        place={currentPlace}
                    />
                );
            });
        }
        return result;
    }
}

export default HomePage;