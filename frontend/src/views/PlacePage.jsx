import React, { Component } from 'react';
import Swal from 'sweetalert2';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Search from '../components/Home/Search/Search';
import Place from '../components/Places/Place';
import Destination from '../components/Destination/Destination';

// import components PagesNumber in Menu
import PagesNumber from '../components/Menu/PagesNumber/PagesNumber';

import callAPI from '../utils/connectAPI';

class PlacePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            destinations: null,
            infoSearch: null,
            pages: [
                {
                    number: 1
                }
            ],
            currentPage: 1
        }
    }

    getPlacesWhenConnectMongo = () => {
        callAPI('place/list-place', 'GET', null)
            .then(res => {
                let { places, totalPages } = res.data;
                let pages = [];
                for (let i = 1; i <= totalPages; i++)
                    pages.push({ number: i });
                this.setState({ places, pages, destinations: null });
                // console.log(res.data);
            })
            .catch((err) => { console.log(err) })
    }

    componentDidMount() {
        this.getPlacesWhenConnectMongo();
    }

    onChangePage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });

        callAPI(`place/list-place/page=${pageNumber}`, 'GET', null)
            .then(res => {
                let { places } = res.data;
                this.setState({ places, destinations: null });
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

    showDestination = (places) => {
        let result = null;
        if (places.length > 0) {
            result = places.map(item => {
                // sử dụng filter 
                let des = item.destination.filter(el => el.name.toLowerCase().indexOf(this.state.infoSearch.toLowerCase()) > -1)
                return (
                    des.map((currentDestination, index) => {
                        return (
                            <Destination
                                key={index}
                                destination={currentDestination}
                            />
                        );
                    })
                );
            });
        }
        return result;
    }

    receiveInfoSearch = (infoSearch) => {
        if (infoSearch)
            callAPI(`place/search=${infoSearch}`, 'GET', null)
                .then(res => {
                    if (res.data.message)
                        Swal.fire({
                            icon: 'warning',
                            title: res.data.message,
                        });

                    else {
                        let { places, destinations } = res.data;
                        if (places)
                            this.setState({ places, destinations: null });
                        else {
                            // destinations == places nhưng tượng trưng kết quả tìm kiếm những điểm đến trong place
                            this.setState({ destinations, infoSearch });
                        }
                    }
                })
                .catch((err) => { console.log(err) });
        else
            this.getPlacesWhenConnectMongo();
    }

    render() {
        var { places, destinations, pages, currentPage } = this.state;
        return (
            <div>
                <Header />
                <Search receiveInfoSearch={this.receiveInfoSearch} title="Bạn muốn tìm địa điểm gì?" input="Nhập tên địa điểm" />
                <div className="popular_places_area" style={{ textAlign: 'center' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="section_title text-center mb_70">
                                    <h3>ĐỊA ĐIỂM</h3>
                                    <p>Các tỉnh thành, địa điểm du lịch ở đất nước Việt Nam</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                destinations ? this.showDestination(destinations) : this.showPlaces(places)
                            }
                        </div>
                    </div>
                    {
                        destinations === null ? (
                            (pages.length > 1) ? (
                                /* Phân trang */
                                <PagesNumber pages={pages} currentPage={currentPage} onChangePage={this.onChangePage} />
                            ) : null
                        ) : null
                    }
                </div>
                <Footer />
            </div>
        );
    }
}

export default PlacePage;