import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CategoryItem extends Component {

    render() {
        let { category } = this.props;
        return (
            <li className="menu-category">
                {
                    category !== 'TT' ?
                        <Link to={`/product/${category}`} className="css-category" >
                            <span onClick={() => this.props.onShownListProductByType(category)} >{category}</span>
                        </Link>
                    :
                        <Link to={`/product`} className="css-category" >
                            <span onClick={() => this.props.onShownListProductByType(category)} > Tất cả </span>
                        </Link>
                }
            </li>
        );
    }
}

export default CategoryItem;