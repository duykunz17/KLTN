import React, { Component } from 'react';
import HeaderAdmin from '../components/Admin/HeaderAdmin';
import Footer from '../components/Home/Footer';
import StatisticalProductBestSeller from '../components/Admin/Statistical/StatisticalProductBestSeller';

class StatisticalProductBestSellerPage extends Component {
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <StatisticalProductBestSeller/>
                <Footer/>
            </div>
        );
    }
}

export default StatisticalProductBestSellerPage;