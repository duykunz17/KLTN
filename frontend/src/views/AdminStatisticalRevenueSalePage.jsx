import React, { Component } from 'react';
import HeaderAdmin from '../components/Admin/HeaderAdmin';

import RevenueStatistics from '../components/Admin/Statistics/RevenueStatistics';
import FooterAdmin from '../components/Admin/FooterAdmin';

export default class StatisticalRevenueSalePage extends Component {
    render() {
        return (
            <div>
                <HeaderAdmin history={this.props.history} />

                <RevenueStatistics />
            
                <FooterAdmin/>
            </div>
        );
    }
}