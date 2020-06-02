import React, { Component } from 'react';
import HeaderAdmin from '../components/Admin/HeaderAdmin';
import Footer from '../components/Home/Footer';

import RevenueStatistics from '../components/Admin/Statistics/RevenueStatistics';

export default class StatisticalRevenueSalePage extends Component {
    render() {
        return (
            <div>
                <HeaderAdmin history={this.props.history} />

                <RevenueStatistics />
            
                <Footer/>
            </div>
        );
    }
}