import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import callAPI from '../../utils/connectAPI';

class NewFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            content: '',
            postDate: new Date(),
            images: '',
            like: 0,
            comment: 0,
            file: null,
            filePath: null,
            account: null
        }
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ account });
        callAPI('post', 'GET', null)
            .then(res => {
                this.setState({
                    post: res.data
                });
            })
            .catch((err) => { console.log(err) })
    }

    displayListPost = () => {
        if (this.state.post.length > 0)
            return this.state.post.map((currentPost, index) => {
                return (
                    <MDBCol key={index} lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBView hover className="rounded z-depth-2 mb-4" waves>
                            <img
                                className="img-fluid"
                                src={currentPost.images}
                                alt=""
                            />
                            <MDBMask overlay="white-slight" />
                        </MDBView>
                        <p>
                            <a href="#!" className="font-weight-bold">{currentPost.account.person.name}</a>, {currentPost.postDate.toString().substr(0, 10)}
                        </p>
                        <p className="dark-grey-text">
                            {currentPost.content}
                        </p>

                        <MDBCardBody>
                            <span className="mr-2">
                                <MDBIcon icon="heart" />
                                {currentPost.like} thích
                  </span>

                            <span>
                                <MDBIcon icon="comment" />
                                {currentPost.comment} bình luận
                  </span>
                        </MDBCardBody>
                        <button className="btn btn-info">
                            Xem thêm </button>
                        <hr className="my-5" />
                    </MDBCol>
                    
                )
            })
    }

    render() {
        return (
            <div className="popular_places_area">
                <div className="container">
                    <div className="row">
                        <MDBCard className="my-5 px-5 pb-5 w-100">

                            <MDBCardBody className="text-center">
                                <h2 className="h1-responsive font-weight-bold text-center my-5">
                                    New feed
        </h2>
                                <MDBRow>
                                    {this.displayListPost()}
                                    
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewFeed;