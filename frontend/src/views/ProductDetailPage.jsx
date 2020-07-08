import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import ProductDetail from '../components/Products/ProductDetail';
import callAPI from './../utils/connectAPI';

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            amountCurrentItemCart: 0
        }
    }

    componentDidMount() {
        callAPI(`product/${this.props.match.params.id}`, 'GET', null)
            .then(res => {
                console.log(res);
                if (res !== undefined && res.data)
                    this.setState({
                        product: res.data
                    });
                else {
                    let history = this.props.history;
                    history.push('/notfound');
                }
            })
            .catch((err) => console.log(err))
    }

    onAddItemIntoCart = (amountCurrentItemCart, product, tempQuantity) => {
        product.quantity = tempQuantity;
        this.setState({
            product,
            amountCurrentItemCart
        });
        // callAPI(`product/page=${this.state.currentPage}`, 'GET', null)
        //     .then(res => {
        //         // let { products } = res.data;

        //     })
        //     .catch((err) => { console.log(err) })
    }

    render() {
        let { product, amountCurrentItemCart } = this.state;
        return (
            <div>
                <Header amountCurrentItemCart={amountCurrentItemCart} />
                <ProductDetail product={product}
                    amountCurrentItemCart={amountCurrentItemCart}
                    onAddItemIntoCart = {this.onAddItemIntoCart}
                />
                <Footer/>
            </div>
        );
    }
}

export default ProductDetailPage; 