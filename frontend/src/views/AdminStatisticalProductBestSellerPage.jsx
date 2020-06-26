import React, { Component } from 'react';
import HeaderAdmin from '../components/Admin/HeaderAdmin';

import StatisticalProductBestSeller from '../components/Admin/Statistics/StatisticalProductBestSeller';
import FooterAdmin from '../components/Admin/FooterAdmin';

class StatisticalProductBestSellerPage extends Component {
    render() {
        return (
            <div>
                <HeaderAdmin history={this.props.history} />
                
                <StatisticalProductBestSeller/>
                
                <FooterAdmin/>
            </div>
        );
    }
}

export default StatisticalProductBestSellerPage;