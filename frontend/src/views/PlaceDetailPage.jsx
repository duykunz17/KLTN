import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import axios from 'axios';


class PlaceDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            area: '',
            images: '',
            description: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/place/' + this.props.object.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    area: res.data.area,
                    images: res.data.images,
                    description: res.data.description,
                })
            })
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <div>
                <Header />
                <div>
                    <div className="destination_banner_wrap overlay" style={{backgroundImage: `url(${this.state.images})`}}>
                        <div className="destination_text text-center">
                            <h3>{this.state.name}</h3>
                            <p>{this.state.area}</p>
                        </div>
                    </div>
                    <div className="destination_details_info">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 col-md-9">
                                    <div className="destination_info">
                                        <h3>Description: {this.state.description}</h3>
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
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default PlaceDetailPage;