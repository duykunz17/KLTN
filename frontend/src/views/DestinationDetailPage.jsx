import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import callAPI from '../utils/connectAPI';
import EvaluationDestination from '../components/Evaluation/EvaluationDestination';
class DestinationDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: null
        }
    }

    componentDidMount() {
        callAPI(`place/destination/${this.props.object.match.params.id}`, 'GET', null)
            .then(res => {
                if(res.data.length >0){
                    this.setState({
                        destination: res.data[0]
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        let { destination } = this.state;
        if (destination === null)
            return null;
        return (
            <div>
                <Header/>
                <div>
                    <div className="destination_banner_wrap overlay" style={{ backgroundImage: `url(${destination.images})` }}>
                        <div className="destination_text text-center">
                            <h3>{destination.name}</h3>
                        </div>
                    </div>
                    <div className="destination_details_info">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 col-md-9">
                                    <div className="destination_info">
                                        <h3>Chào mừng bạn đến với {destination.name}</h3>
                                        <p>{destination.description}</p>
                                    </div>
                                </div>

                            </div>

                            {destination._id ? <EvaluationDestination destination={destination} /> : null}

                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}

export default DestinationDetail;