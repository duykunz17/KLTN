import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import ProductDetail from '../components/Products/ProductDetail';
import callAPI from './../utils/connectAPI';

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        callAPI(`product/${this.props.object.match.params.id}`, 'GET', null)
            .then(res => {
                this.setState({
                    product: res.data
                })
            })
            .catch((err) => console.log(err))
    }

    render() {
        let { product } = this.state;
        return (
            <div>
                <Header/>
                <ProductDetail product={product} />
                <Footer/>
            </div>
        );
    }
}

export default ProductDetailPage; 