import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

import Swal from 'sweetalert2';

import ListPostPersonal from '../components/Post/Personals/ListPostPersonal';
import PostPersonal from '../components/Post/Personals/PostPersonal';
import FormPost from '../components/Post/Personals/FormPost';
import ImagesPost from '../components/Post/Personals/ImagesPost';
import UpdateInfo from '../components/Post/Personals/UpdateInfo';

import * as Config from '../constants/parameterConfig';
import callAPI from '../utils/connectAPI';

import io from 'socket.io-client';
const socket = io(Config.ENDPOINT_SOKET);

class BlogPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: false,
            phone: '',
            adress: '',
            email: '',
            account: null,

            isOpenForm: false,

            posts: [],
            countPost: 0,        // use to init this.state in componentDidUpdate
            updateInfo: 0
        }
    }

    getPostsOfAccount = (account) => {
        callAPI('post/account/' + account._id, 'GET', null)
            .then(res => {
                this.setState({ posts: res.data, countPost: this.state.countPost + 1 });
            }).catch((err) => { console.log(err) })
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        if (account !== null) {
            let person = account.person;
            this.setState({
                account,
                name: person.name,
                gender: person.gender ? person.gender : false,
                phone: person.phone ? person.phone : '',
                address: person.address ? person.address : '',
                email: person.email ? person.email : ''
            });
            this.getPostsOfAccount(account);

            // ask connect socket.server
            socket.emit('joinAdmin', { account }, () => { });

            // receive result
            socket.on('resultHandling', post => {
                let posts = this.state.posts.map(el => {
                    if (el._id === post.result._id)
                        el = post.result;
                    return el;
                })
                this.setState({ posts, countPost: this.state.countPost + 1 });
            })
        }
        else {
            let history = this.props.history;
            history.push('/login');
        }
    }

    onDeletePost = (post) => {
        callAPI('post/' + post._id, 'DELETE', null)
            .then(res => {
                if (res.data.message) {
                    let { posts, countPost } = this.state;
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                    })
                    this.setState({ posts: posts.filter(el => el._id !== post._id), countPost: countPost - 1 });
                    if (post.status === 'W')
                        socket.emit('submitPost', post, () => { });
                }
            }).catch((err) => { console.log(err) })
    }

    displayListPostByUser = (posts, countPost) => {
        let result = null;
        if (posts.length > 0)
            result = posts.map((currentPost, index) => {
                return (
                    <PostPersonal
                        key={index}
                        currentPost={currentPost}
                        account={this.state.account}
                        onDeletePost={this.onDeletePost}
                        countPost={countPost}
                    />
                )
            });
        return result;
    }

    onSavePost = (post) => {
        post.account = this.state.account;

        callAPI('post/add', 'POST', post)
            .then(res => {
                if (res.data.result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Bài đã đăng thành công',
                    })

                    post.interactions = []; post.comments = []; post.sumLike = 0; post.status = 'W';
                    socket.emit('submitPost', post, () => { });

                    this.getPostsOfAccount(this.state.account);
                }
            })
            .catch((err) => { console.log(err) })
    }

    onOpenFormUpdateInfo = (isOpen, info, isUpdateAvatar) => {
        if (info) {
            let person = info.person;
            this.setState({
                account: info,
                name: person.name,
                gender: person.gender ? person.gender : false,
                phone: person.phone ? person.phone : '',
                address: person.address ? person.address : '',
                email: person.email ? person.email : ''
            });
        }
        let updateInfo = this.state.updateInfo; 
        if (isOpen)
            updateInfo++;
        this.setState({ isOpenForm: isOpen, updateInfo });

        if (isUpdateAvatar)
            this.getPostsOfAccount(info);
    }

    render() {
        let { name, gender, phone, address, email, account, isOpenForm, posts, countPost } = this.state;
        return (
            <div>
                <Header updateInfo={this.state.updateInfo} />

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
                                    {account ?
                                        <MDBCardBody cascade className="text-center">
                                            <img src={account.avatar} alt="Info" className="ImgPreview" />
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
                                                <p className="text-center mt-3" style={{ fontWeight: 'bold', fontSize: '30px', color: 'black' }}> Giới thiệu </p>
                                                <hr />
                                                <div className="text-left ml-2">
                                                    <p style={{ lineHeight: '3' }}><i className="fa fa-user" aria-hidden="true"></i> Họ và tên: <span style={{ fontWeight: 'bold' }}>{name}</span> </p>
                                                    {gender === true ?
                                                        <p style={{ lineHeight: '3' }}><i className="fa fa-transgender" aria-hidden="true"></i> Giới tính: <span style={{ fontWeight: 'bold' }}>Nam</span> </p>
                                                        : <p style={{ lineHeight: '3' }}><i className="fa fa-transgender" aria-hidden="true"></i> Giới tính: <span style={{ fontWeight: 'bold' }}>Nữ</span> </p>
                                                    }
                                                    <p style={{ lineHeight: '3' }}><i className="fa fa-envelope" aria-hidden="true"></i> Email: <span style={{ fontWeight: 'bold' }}>{email}</span> </p>
                                                    <p style={{ lineHeight: '3' }}><i className="fa fa-phone" aria-hidden="true"></i> Số điện thoại: <span style={{ fontWeight: 'bold' }}>{phone}</span> </p>
                                                    <p style={{ lineHeight: '3' }}><i className="fa fa-map-marker" aria-hidden="true"></i> Đến từ: <span style={{ fontWeight: 'bold' }}>{address}</span> </p>
                                                </div>
                                                <hr />
                                                <div style={{ marginBottom: '10px' }} className="ml-2 mr-2 mb-3">
                                                    <button type="button" className="btn btn-secondary btn-lg btn-block" style={{ borderRadius: '20px' }} onClick={() => this.onOpenFormUpdateInfo(true, null, false)} >Cập nhật thông tin cá nhân</button>
                                                </div>
                                            </div>

                                            <div className="card ml-3" style={{ borderRadius: '10px', marginTop: '52px' }}>
                                                <p className="text-center mt-3" style={{ fontWeight: 'bold', fontSize: '30px', color: 'black' }}> Ảnh </p>
                                                <hr />
                                                <ImagesPost posts={posts} />
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-6">
                                            <div className="row mr-3" >

                                                { isOpenForm ? <UpdateInfo user={account} onOpenFormUpdateInfo={this.onOpenFormUpdateInfo} /> : null}

                                                {/* Form use to post */}
                                                <FormPost onSavePost={this.onSavePost} countPost={countPost} />

                                                <ListPostPersonal>
                                                    {this.displayListPostByUser(posts, countPost)}
                                                </ListPostPersonal>
                                            </div>
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