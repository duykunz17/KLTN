import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Place from '../components/Places/Place';
import callAPI from '../utils/connectAPI';
import Search from '../components/Home/Search/Search';

// import components PagesNumber in Menu
import PagesNumber from '../components/Menu/PagesNumber/PagesNumber';

class PlacePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            pages: [
                {
                  number: 1
                }  
              ],
            currentPage: 1
        }
    }

    componentDidMount() {
        callAPI('place/list-place', 'GET', null)
            .then(res => {
                let { places, totalPages } = res.data;
                let pages = [];
                for (let i = 1; i <= totalPages; i++)
                    pages.push({number: i});
                this.setState({
                    places, pages
                });
                // console.log(res.data);
            })
            .catch((err) => { console.log(err) })
    }

    onChangePage = (pageNumber) => {
        this.setState({currentPage: pageNumber});
        
        callAPI(`place/list-place/page=${pageNumber}`, 'GET', null)
            .then(res => {
                let { places } = res.data;
                this.setState({
                    places
                });
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
        var { places, pages, currentPage } = this.state;
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

                    {
                        (pages.length > 1) ? (
                            /* Phân trang */
                            <PagesNumber pages={pages} currentPage={currentPage} onChangePage={this.onChangePage} />
                        ) : null
                    }
                </div>
                <Footer />
            </div>
        );
    }
}

export default PlacePage;