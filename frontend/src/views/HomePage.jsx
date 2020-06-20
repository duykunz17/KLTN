import React, { Component } from 'react';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import Banner from '../components/Banner';
import Utilities from '../components/Utilities';
import RecentTrip from '../components/RecentTrip';

import PopularPlaces from '../components/Places/PopularPlaces';

import callAPI from '../utils/connectAPI';
import Destination from '../components/Destination/Destination';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [],
            posts: []
        }
    }

    componentDidMount() {
        callAPI('place/popular-place', 'GET', null)
            .then(res => {
                this.setState({
                    places: res.data
                })
            })
            .catch((err) => { console.log(err) })

        callAPI('post/post-recent', 'GET', null)
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        var { places, posts } = this.state;
        return (
            <div className="HomePage">
                <Header />
                <Banner />
                {/* <Search receiveInfoSearch={this.receiveInfoSearch} title="Bạn muốn đi đâu?" input="Nhập tên địa điểm" /> */}
                <PopularPlaces>
                    {this.showPlaces(places)}
                </PopularPlaces>
                <Utilities />
                <div className="recent_trip_area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="section_title text-center mb_70">
                                    <h3>CHUYẾN ĐI GẦN ĐÂY</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.showPostRecent(posts)}
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }

    showPlaces = (places) => {
        let result = null;
        if (places.length > 0) {
            result = places.map((currentPlace, index) => {
                return (
                    <Destination
                        key={index}
                        destination={currentPlace}
                    />
                );
            });
        }
        return result;
    }

    showPostRecent = (posts) => {
        let result = null;
        if (posts.length > 0) {
            result = posts.map((currentPost, index) => {
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
}

export default HomePage;