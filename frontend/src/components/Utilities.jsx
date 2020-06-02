import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Utilities extends Component {
    render() {
        return (
            <div className="travel_variation_area">
                <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                    <div className="single_travel text-center">
                        <div className="icon">
                        <Link to="/schedule"><img src="images/map.svg" alt="" style={{width:'100px', height:'100px'}}/></Link>
                        </div>
                        <h3>Lập hành trình</h3>
                        <p>Giúp người dùng dễ dàng và tiết kiệm thời gian với tiện ích lập hành trình cho chuyến đi.</p>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                    <div className="single_travel text-center">
                        <div className="icon">
                        <Link to="/post"><img src="images/share.svg" alt="" style={{width:'100px', height:'100px'}}/></Link>
                        </div>
                        <h3>Chia sẻ khoảnh khắc</h3>
                        <p>Cùng giữ lại những kỉ niệm, khoảnh khắc và trải nghiệm du lịch tuyệt vời nhất với chúng tôi.</p>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                    <div className="single_travel text-center">
                        <div className="icon">
                        <Link to="/place"><img src="images/global.svg" alt="" style={{width:'100px', height:'100px'}}/></Link>
                        </div>
                        <h3>Điểm đến</h3>
                        <p>Khám phá, nắm bắt các thông tin cơ bản từ các điểm đến và đánh giá chi tiết từ thành viên. </p>
                    </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                    <div className="single_travel text-center">
                        <div className="icon">
                        <Link to="/product"><img src="images/product.svg" alt="" style={{width:'100px', height:'100px'}}/></Link>
                        </div>
                        <h3>Dịch vụ bán sản phẩm</h3>
                        <p>Hỗ trợ các bạn việc chuẩn bị đồ dùng cần thiết cho chuyến đi tốt nhất trên khắp các điểm đến. </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Utilities;