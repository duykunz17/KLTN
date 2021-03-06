import React, { Component } from 'react';
import Swal from 'sweetalert2';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Search from '../components/Home/Search/Search';

// import components Products
import ProductList from '../components/Products/ProductList';
import Product from '../components/Products/Product';

// import components PagesNumber in Menu
import PagesNumber from '../components/Menu/PagesNumber/PagesNumber';

import callAPI from '../utils/connectAPI';
import Category from '../components/Products/Category';
import CategoryItem from '../components/Products/CategoryItem';

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categorys: [],
            pages: [
                {
                    number: 1
                }
            ],
            currentPage: 1,
            amountCurrentItemCart: 0
        }
    }

    getProductsWhenConnectMongo = () => {
        callAPI('product', 'GET', null)
            .then(res => {
                let { products, totalPages } = res.data;
                let pages = [];
                for (let i = 1; i <= totalPages; i++)
                    pages.push({ number: i });
                this.setState({
                    products, pages
                });
            })
            .catch((err) => { console.log(err) })
    }

    componentDidMount() {
        this.getProductsWhenConnectMongo();

        callAPI('product/category', 'GET', null)
            .then(res => {
                let { productTypes } = res.data;
                this.setState({ categorys: productTypes });
            })
    }

    onChangePage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });

        callAPI(`product/page=${pageNumber}`, 'GET', null)
            .then(res => {
                let { products } = res.data;
                this.setState({
                    products
                });
            })
            .catch((err) => { console.log(err) })
    }

    onAddItemIntoCart = (amountCurrentItemCart, product, tempQuantity) => {
        this.setState({
            products: this.state.products.map(el => {
                if (el._id === product._id)
                    el.quantity = tempQuantity;
                return el;
            }),
            amountCurrentItemCart
        });
        // callAPI(`product/page=${this.state.currentPage}`, 'GET', null)
        //     .then(res => {
        //         // let { products } = res.data;

        //     })
        //     .catch((err) => { console.log(err) })
    }

    receiveInfoSearch = (infoSearch) => {
        if (infoSearch)
            callAPI(`product/search=${infoSearch}`, 'GET', null)
                .then(res => {
                    if (res.data.message)
                        Swal.fire({
                            icon: 'warning',
                            title: res.data.message,
                        });

                    else {
                        let { products } = res.data;
                        // console.log(products[0])
                        this.setState({
                            products
                        });
                    }
                })
                .catch((err) => { console.log(err) });
        else
            this.getProductsWhenConnectMongo();
    }

    showProductList = (products, amountCurrentItemCart) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <Product
                        key={index}
                        currentPage={this.state.currentPage}
                        product={product}
                        amountCurrentItemCart={amountCurrentItemCart}
                        onAddItemIntoCart={this.onAddItemIntoCart}
                    />
                );
            });
        }
        return result;
    }

    showCategoryProduct = (categorys) => {
        let result = null;
        if (categorys.length > 0) {
            result = categorys.map((category, index) => {
                return (
                    <CategoryItem
                        key={index}
                        category={category}
                        onShownListProductByType={this.onShownListProductByType}
                    />
                );
            });
            result.unshift(
                <CategoryItem
                    key={result.length + 1}
                    category='TT'
                    onShownListProductByType={this.onShownListProductByType}
                />
            );
        }
        return result;
    }

    onShownListProductByType = (type) => {
        if (type === 'TT')
            this.getProductsWhenConnectMongo();
        else
            callAPI('product/category/' + type, 'GET', null)
                .then(res => {
                    let { products } = res.data;
                    this.setState({
                        products, pages: []
                    });
                })
                .catch((err) => { console.log(err) })
    }

    render() {

        var { products, categorys, pages, currentPage, amountCurrentItemCart } = this.state;
        // console.log(products);
        return (
            <div>
                <Header amountCurrentItemCart={amountCurrentItemCart} />
                <Search receiveInfoSearch={this.receiveInfoSearch} title="Bạn muốn tìm sản phẩm gì?" input="Nhập tên sản phẩm" />
                <Category>
                    {this.showCategoryProduct(categorys)}
                </Category>

                <div className="product_list">
                    <ProductList>
                        {this.showProductList(products, amountCurrentItemCart)}
                    </ProductList>
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

export default ProductPage;