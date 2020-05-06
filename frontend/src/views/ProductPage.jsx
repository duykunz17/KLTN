import React, { Component } from 'react';
import Product from '../components/Products/Product';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Search from '../components/Home/Search/Search';

class ProductPage extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Search title="Bạn muốn tìm sản phẩm gì?" input="Nhập tên sản phẩm"/>
                <Product/>
                <Footer/>
            </div>
        );
    }
}

export default ProductPage;