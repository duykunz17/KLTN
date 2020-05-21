import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

// import component evaluation
import EvaluationPlace from '../components/Evaluation/EvaluationPlace';

import callAPI from './../utils/connectAPI';

class PlaceDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: {}
        }
    }

    componentDidMount() {
        callAPI(`place/${this.props.object.match.params.id}`, 'GET', null)
            .then(res => {
                this.setState({
                    place: res.data
                })
            })
            .catch((err) => console.log(err))
    }
    render() {
        let { place } = this.state;
        return (
            <div>
                <Header />
                <div>
                    <div className="destination_banner_wrap overlay" style={{backgroundImage: `url(${place.images})`}}>
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
                                        <h3>Description: {place.description}</h3>
                                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.</p>
                                        <p>Variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.</p>
                                        <div className="single_destination">
                                            <h4>Day-01</h4>
                                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
                                        </div>
                                        <div className="single_destination">
                                            <h4>Day-02</h4>
                                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
                                        </div>
                                        <div className="single_destination">
                                            <h4>Day-03</h4>
                                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            { place._id ? <EvaluationPlace place={place} /> : null }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default PlaceDetailPage;