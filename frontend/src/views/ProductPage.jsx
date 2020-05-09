import React, { Component } from 'react';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Search from '../components/Home/Search/Search';

// import components Products
import ProductList from '../components/Products/ProductList';
import Product from '../components/Products/Product';

// import components PagesNumber in Menu
import PagesNumber from '../components/Menu/PagesNumber/PagesNumber';

import callAPI from '../utils/connectAPI';

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            pages: [
              {
                number: 1
              }  
            ],
            currentPage: 1,
            amountCurrentItemCart: 0
        }
    }

    componentDidMount() {
        callAPI('product', 'GET', null)
            .then(res => {
                let { products, totalPages } = res.data;
                let pages = [];
                for (let i = 1; i <= totalPages; i++)
                    pages.push({number: i});
                this.setState({
                    products, pages
                });
            })
            .catch((err) => { console.log(err) })
    }

    onChangePage = (pageNumber) => {
        this.setState({currentPage: pageNumber});
        
        callAPI(`product/page=${pageNumber}`, 'GET', null)
            .then(res => {
                let { products } = res.data;
                this.setState({
                    products
                });
            })
            .catch((err) => { console.log(err) })
    }

    onAddItemIntoCart = (amountCurrentItemCart) => {
        this.setState({amountCurrentItemCart});
    }

    showProductList = (products, amountCurrentItemCart) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <Product
                        key={index}
                        product={product}
                        amountCurrentItemCart = {amountCurrentItemCart}
                        onAddItemIntoCart = {this.onAddItemIntoCart}
                    />
                );
            });
        }
        return result;
    }

    render() {
        var { products, pages, currentPage, amountCurrentItemCart } = this.state;
        return (
            <div>
                <Header amountCurrentItemCart={amountCurrentItemCart}  />
                
                <Search title="Bạn muốn tìm sản phẩm gì?" input="Nhập tên sản phẩm"/>

                <div className="product_list">
                    <ProductList>
                        { this.showProductList(products, amountCurrentItemCart) }
                    </ProductList>

                    {
                        (pages.length > 1) ? (
                            /* Phân trang */
                            <PagesNumber pages={pages} currentPage={currentPage} onChangePage={this.onChangePage} />
                        ) : null
                    }
                </div>

                <Footer/>
            </div>
        );
    }
}

export default ProductPage;