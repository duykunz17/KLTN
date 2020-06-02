import React, { Component } from 'react';
import HeaderAdmin from '../components/Admin/HeaderAdmin';
import Footer from '../components/Home/Footer';

import ProductsDataTable from '../components/Admin/ProductsManager/ProductsDataTable';


class AdminPage extends Component {
    render() {
        return (
            <div className="AdminPage">
                <HeaderAdmin history={this.props.history} />
                
                <div className="where_togo_area">
                    <div className="row justify-content-center">
                        <div className="container">
                                <h2 style={{color:'white', textAlign:'center'}}>QUẢN LÝ SẢN PHẨM DỊCH VỤ</h2>
                        </div>
                    </div>
                </div> 
                <ProductsDataTable/>
                <Footer/>
            </div>
        );
    }
}

export default AdminPage;