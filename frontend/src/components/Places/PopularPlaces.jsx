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
                                <h3>ĐỊA ĐIỂM NỔI BẬT</h3>
                                <p>Những địa điểm nổi bật được người trải nghiệm đánh giá từ 4 đến 5 sao</p>
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
                                <Link to='/places' className="boxed-btn4" >Xem thêm</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopularPlaces;