import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Swal from 'sweetalert2';

import callAPI from '../utils/connectAPI';
import storage from '../utils/firebaseStorage';
import PersonalPage from './PersonalPage';
import ImagesPost from '../components/Post/Personals/ImagesPost';

class BlogPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: false,
            phone: '',
            adress: '',
            email: '',
            user: null
        }
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (user !== null) {
            let person = user.person;
            this.setState({
                user,
                name: user.person.name,
                gender: person.gender ? person.gender : false,
                phone: person.phone ? person.phone : '',
                address: person.address ? person.address : '',
                email: person.email ? person.email : ''
            })
        }
        else {
            let history = this.props.history;
            history.push('/login');
        }
    }

    render() {
        let { name, gender, phone, address, email, user } = this.state;
        return (
            <div>
                <Header />

                <MDBCard className="my-5 px-5 pb-5" >
                    <MDBCardBody >
                        <MDBRow >
                            <MDBCol md="12" >
                                <MDBCard reverse>
                                    <MDBView hover cascade waves>
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(142).jpg"
                                            alt=""
                                            className="img-fluid"
                                            style={{ width: '100%', height: '500px' }}
                                        />
                                        <MDBMask overlay="white-slight" className="waves-light" />
                                    </MDBView>
                                    {user ?
                                        <MDBCardBody cascade className="text-center">
                                            <img src={user.avatar} alt="Info" className="ImgPreview" />
                                            <h2 className="font-weight-bold">
                                                {name}
                                            </h2>
                                        </MDBCardBody>
                                        : ''
                                    }
                                    <hr className="mb-5 mt-4" />
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6" >
                                            <div className="card ml-3" style={{ borderRadius: '10px' }}>
                                                <p className="text-center mt-3" style={{ fontWeight: 'bold', fontSize:'30px', color:'black' }}> Giới thiệu </p>
                                                <hr />
                                                <div className="text-left ml-2">
                                                    <p style={{ lineHeight: '3' }}><i class="fa fa-user" aria-hidden="true"></i> Họ và tên: <span style={{ fontWeight: 'bold' }}>{name}</span> </p>
                                                    {gender === true ?
                                                        <p style={{ lineHeight: '3' }}><i class="fa fa-transgender" aria-hidden="true"></i> Giới tính: <span style={{ fontWeight: 'bold' }}>Nam</span> </p>
                                                        : <p style={{ lineHeight: '3' }}><i class="fa fa-transgender" aria-hidden="true"></i> Giới tính: <span style={{ fontWeight: 'bold' }}>Nữ</span> </p>
                                                    }
                                                    <p style={{ lineHeight: '3' }}><i class="fa fa-envelope" aria-hidden="true"></i> Email: <span style={{ fontWeight: 'bold' }}>{email}</span> </p>
                                                    <p style={{ lineHeight: '3' }}><i class="fa fa-phone" aria-hidden="true"></i> Số điện thoại: <span style={{ fontWeight: 'bold' }}>{phone}</span> </p>
                                                    <p style={{ lineHeight: '3' }}><i class="fa fa-map-marker" aria-hidden="true"></i> Đến từ: <span style={{ fontWeight: 'bold' }}>{address}</span> </p>
                                                </div>
                                                <hr />
                                                <div style={{ marginBottom: '10px' }} className="ml-2 mr-2 mb-3">
                                                    <button type="button" class="btn btn-secondary btn-lg btn-block" style={{ borderRadius: '20px' }} data-toggle="modal" data-target="#updateInfoModal">Cập nhật thông tin cá nhân</button>
                                                </div>
                                            </div>

                                            <div className="card ml-3" style={{ borderRadius: '10px', marginTop:'52px' }}>
                                                <p className="text-center mt-3" style={{ fontWeight: 'bold', fontSize:'30px', color:'black' }}> Ảnh </p>
                                                <hr />
                                                <ImagesPost />
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-6">
                                            <PersonalPage />
                                        </div>
                                    </div>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

                <Footer />
            </div>
        );
    }
}

export default BlogPage;