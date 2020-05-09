import React, { Component } from 'react';

class Product extends Component {

    render() {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="section_title text-center mb_70">
                            <h3>SẢN PHẨM</h3>
                            <p>Các sản phẩm, đồ dùng cần thiết cho những chuyến đi du lịch</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    
                    {this.props.children}
                    
                </div>
            </div>
        );
    }
}

export default Product;