import React, { Component } from 'react';
import {
    MDBNavItem,
    MDBNavLink
} from 'mdbreact';

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    render() {
        let { product } = this.props;
        return (
            <MDBNavItem >
                <MDBNavLink to="" >{product.productType}</MDBNavLink>
            </MDBNavItem>
        );
    }
}

export default CategoryItem;