import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBMask, MDBView } from "mdbreact";
import Moment from 'react-moment';
import StarRating from '../Evaluation/StarRating';
class ListReview extends Component {

    displayImages = (images) => {
        return images.map((img, index) => {
            return (
                <MDBCol key={index} lg="3" md="6" className="mb-lg-0 mb-4">

                    <MDBView hover className="rounded z-depth-2 mb-4" waves>
                        <img
                            alt="thumbnail" 
                            className="img-thumbnail"
                            src={img}
                            width="100%" />
                        <MDBMask overlay="white-slight" />
                    </MDBView>
                </MDBCol>
            )
        })
    }

    render() {
        let { evaluations } = this.props;
        return (
            evaluations.map((item, index) => {
                return (
                    <MDBCol key={index} lg="12" xl="12">
                        <div className="d-flex">
                            <div className="info">
                                <div className="social_wrap d-flex align-items-center justify-content">
                                    <div className="avatar mb-5">
                                        <img src={item.account.avatar} className="avatar" alt="ava" />
                                    </div>
                            &nbsp;&nbsp;
                            <div className="number">
                                        <span>
                                            <span style={{ paddingRight: '130px' }}>
                                                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{item.account.person.name}</span> <span style={{ fontSize: '20px' }}>&nbsp;vào lúc&nbsp;</span>
                                                <Moment format="HH:mm, DD/MM/YYYY" style={{ fontSize: '20px' }}>
                                                    {item.reviewdate}
                                                </Moment>
                                                <span style={{ fontSize: '20px' }}>&nbsp;đã đánh giá&nbsp;</span>
                                                <StarRating numberOfStars={5} value={item.voted} size={20} editing={false} />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="d-flex justify-content mb-2" style={{ fontSize: '20px', color:'black', marginTop: '-20px' }}>
                            {item.title}
                        </p>

                        <MDBRow>
                            {
                                item.images.length > 0 ? this.displayImages(item.images) : ''
                            }
                        </MDBRow>

                        <p className="d-flex justify-content mt-1" style={{ fontSize: '20px', marginTop: '-20px' }}>
                            {item.content}
                        </p>
                        <hr className="my-3" />
                    </MDBCol>
                )
            })
        );

    }
}

export default ListReview;