import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import * as Config from '../constants/parameterConfig';
import axios from 'axios';

const Place = props => (
        <div className="col-lg-4 col-md-6">
            <div className="single_place">
                <div className="thumb">
                    <img src={props.place.images} alt="" />
                    <Link to="" className="prise">$500</Link>
                </div>
                <div className="place_info">
                    <Link to={"/place/"+props.place._id} key={props.place._id}><h3> {props.place.name}</h3></Link>
                    <p>{props.place.area}</p>
                    <div className="rating_days d-flex justify-content-between">
                        <span className="d-flex justify-content-center align-items-center">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <Link to="">(20 Review)</Link>
                        </span>
                        <div className="days">
                            <i className="fa fa-clock-o" />
                            <Link to="">5 Days</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)

class PopularPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/place/list-place')
            .then(res => {
                this.setState({
                    places: res.data
                })
                //console.log(res.data);
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        return (
            <div className="popular_places_area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section_title text-center mb_70">
                                <h3>Popular Places</h3>
                                <p>Suffered alteration in some form, by injected humour or good day randomised booth anim 8-bit hella wolf moon beard words.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.places.map(currentPlace => {
                            return <Place place={currentPlace} key={currentPlace._id}/>
                        })}

                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="more_place_btn text-center">
                                <Link className="boxed-btn4" to="">More Places</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopularPlaces;