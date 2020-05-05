import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PopularPlaces extends Component {

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
                        {/* show list places */}
                        { this.props.children }
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