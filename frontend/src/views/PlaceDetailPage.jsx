import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { Link } from 'react-router-dom';

import callAPI from './../utils/connectAPI';
import StarRating from '../components/Evaluation/StarRating';

class PlaceDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: null
        }
    }

    componentDidMount() {
        callAPI(`place/${this.props.match.params.id}`, 'GET', null)
            .then(res => {
                if (res !== undefined)
                    this.setState({
                        place: res.data
                    });
                else {
                    let history = this.props.history;
                    history.push('/notfound');
                }
            })
            .catch((err) => console.log(err))
    }

    showDestination = (place) => {
        return place.destination.map((currentDestination, index) => {
            return (
                <div key={index} className="col-lg-4 col-md-6">
                <div  className="single_place">
                    <div className="thumb">
                        <img src={currentDestination.images} alt="" />
                    </div>
                    <div className="place_info">
                    <Link to={"/places/destination/" + currentDestination._id} key={currentDestination._id}><h3> {currentDestination.name}</h3></Link>
                        <p>{currentDestination.area}</p>
                        <div className="rating_days d-flex justify-content-between">
                            <StarRating
                                numberOfStars={5}
                                value={Math.round(currentDestination.rating)}
                                size={10}
                                editing={false}
                            />
                            <span className="d-flex justify-content-end align-items-center">
                                <Link to={`/places/${place._id}`}>{currentDestination.review} đánh giá</Link>
                            </span>
                        </div>

                    </div>
                </div>
                </div>
            );
        });
    }

    render() {
        let { place } = this.state;
        if (place === null)
            return null;
        return (
            <div>

                <Header />

                <div>
                    <div className="destination_banner_wrap overlay" style={{ backgroundImage: `url(${place.images})` }}>
                        <div className="destination_text text-center">
                            <h3>{place.name}</h3>
                            <p>{place.area}</p>
                        </div>
                    </div>
                    <div className="destination_details_info">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 col-md-9">
                                    <div className="destination_info">
                                        <h3>Chào mừng bạn đến với {place.name}</h3>
                                        <p>{place.description}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="popular_places_area">
                        <div className="container">
                            <h3>Các điểm du lịch tại {place.name}</h3>
                            <div className="row">
                                {this.showDestination(place)}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default PlaceDetailPage;