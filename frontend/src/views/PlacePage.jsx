import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Place from '../components/Places/Place';
import callAPI from '../utils/connectAPI';
import Search from '../components/Home/Search/Search';

class PlacePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        callAPI('place/list-place', 'GET', null)
            .then(res => {
                this.setState({
                    places: res.data
                })
                // console.log(res.data);
            })
            .catch((err) => { console.log(err) })
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

    render() {
        var { places } = this.state;
        return (
            <div>
                <Header />
                <Search title="Bạn muốn tìm địa điểm gì?" input="Nhập tên địa điểm"/>
                <div className="popular_places_area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="section_title text-center mb_70">
                                    <h3>ĐỊA ĐIỂM</h3>
                                    <p>Suffered alteration in some form, by injected humour or good day randomised booth anim 8-bit hella wolf moon beard words.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.showPlaces(places)}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default PlacePage;