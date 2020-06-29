import React, { Component } from 'react';
import Swal from 'sweetalert2';

import callAPI from '../../../utils/connectAPI';
import storage from '../../../utils/firebaseStorage';

// import componet ImageUpload
import ImageUpload from './ImageUpload';

export default class UpdateInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: false,
            phone: '',
            adress: '',
            email: '',
            user: {},
            file: null,
            filePath: null
        }
    }

    componentDidMount() {
        let { user } = this.props;
        if (user) {
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
    }

    onUploadImage = (event) => {
        let file = event.target.files[0];

        if (file) {
            this.setState({ file });
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({
                    filePath: reader.result
                });
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }

    onSubmit = async () => {
        let { user, name, gender, phone, address, email, file } = this.state;

        let checkName = false, checkEmail = false;

        if (name !== '') {
            checkName = true;
            document.getElementById('errName').innerHTML = '';
        }
        else {
            document.getElementById('errName').style.color = 'red';
            document.getElementById('errName').innerHTML = 'Tên không được rỗng.';
        }

        let rexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email === '') {
            document.getElementById('errEmail').style.color = 'red';
            document.getElementById('errEmail').innerHTML = 'Email không được rỗng.';
        }
        else if (!rexEmail.test(email)) {
            document.getElementById('errEmail').style.color = 'red';
            document.getElementById('errEmail').innerHTML = 'Email không hợp lệ. Hãy thử lại!';
        }
        else {
            checkEmail = true;
            document.getElementById('errEmail').innerHTML = '';
        }

        if (checkName && checkEmail) {
            user.person.name = name;
            user.person.gender = gender;
            user.person.phone = phone;
            user.person.address = address;
            user.person.email = email;

            if (file) {
                let uploadTask = storage.ref(`images/${file.name}`).put(file);
                await uploadTask.on('state_changed',
                    (snapshot) => {
                        // progress function
                        let process = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        Swal.fire({
                            title: 'Đang tải ảnh',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            background: '#19191a',
                            showConfirmButton: false,
                            onOpen: () => {
                                Swal.showLoading();
                            },
                            timer: process,
                            timerProgressBar: true
                        });
                    },
                    (error) => {
                        console.log('Error: ' + error);
                    },
                    () => {
                        // complete function
                        storage.ref('images').child(file.name).getDownloadURL().then(url => {
                            // console.log('url: ' + url);
                            user.avatar = url;

                            // update into database
                            callAPI(`account/update-info/${user._id}`, 'POST', user)
                                .then(res => {
                                    if (res.data.messSuccess) {
                                        sessionStorage.setItem("user", JSON.stringify(user));
                                        Swal.fire({
                                            icon: 'success',
                                            title: res.data.messSuccess,
                                        });

                                        this.props.onOpenFormUpdateInfo(true, user, true);
                                    }
                                })
                                .catch(err => console.log(err));
                        }
                        );
                    }
                );

            }
            else {
                // update into database
                callAPI(`account/update-info/${user._id}`, 'POST', user)
                    .then(res => {
                        if (res.data.messSuccess) {
                            sessionStorage.setItem("user", JSON.stringify(user));
                            Swal.fire({
                                icon: 'success',
                                title: res.data.messSuccess,
                            });

                            this.props.onOpenFormUpdateInfo(true, user, false);
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    render() {
        let { name, gender, phone, address, email, user } = this.state;
        return (
            <div className="card w-100 mb-3" style={{ borderRadius: '10px' }}>
                <p className="text-center mt-3 " style={{ fontWeight: 'bold', fontSize: '30px', color: 'black' }}> Cập nhật thông tin cá nhân </p>
                <hr />
                <div className="row">
                    <div className="col-md-4 mt-uploadInfo" style={{borderRight: '2px solid #e5e5e5', height: '380px'}}>
                        <div className="ImgPreview m-l-80 m-t-20">
                            {this.state.filePath ?
                                <img src={this.state.filePath} alt="Info" className="ImgPreview" />
                                : <img src={user.avatar} alt="Info" className="ImgPreview" />
                            }
                        </div>

                        <ImageUpload onUploadImage={this.onUploadImage} />
                    </div>
                    <div className="col-md-8 mt-uploadInfo" style={{marginTop:'-40px', marginBottom:'20px'}}>
                        <div className="row">
                            <div className="col-md-4 ml-1">
                                <div className="form-group">
                                    <p className="p-tl-info">Họ và tên:</p>
                                </div>
                            </div>
                            <div className="col-md-8 mr-inputInfo">
                                <div className="form-group">
                                    <input name="name" type="text" className="input-info"
                                        value={name} onChange={this.onChange} />
                                </div>
                                <span id="errName"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 ml-1">
                                <div className="form-group">
                                    <p className="p-tl-info">Email:</p>
                                </div>
                            </div>
                            <div className="col-md-8 mr-inputInfo">
                                <div className="form-group">
                                    <input name="email" type="text" className="input-info"
                                        value={email} onChange={this.onChange} />
                                </div>
                                <span id="errEmail"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 ml-1">
                                <div className="form-group">
                                    <p className="p-tl-info">Số điện thoại:</p>
                                </div>
                            </div>
                            <div className="col-md-8 mr-inputInfo">
                                <div className="form-group">
                                    <input name="phone" type="text" className="input-info"
                                        value={phone} onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 ml-1">
                                <div className="form-group">
                                    <p className="p-tl-address">Địa chỉ:</p>
                                </div>
                            </div>
                            <div className="col-md-8 mr-inputInfo">
                                <div className="form-group">
                                    <textarea name="address" type="text" className="input-address"
                                        value={address} onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 ml-1">
                                <div className="form-group">
                                    <p className="p-tl-info">Giới tính:</p>
                                </div>
                            </div>
                            <div className="form-group mr-inputInfo p-tl-gender">
                                <input type="checkbox" name="gender"
                                    value={gender} onChange={this.onChange} checked={gender} style={{marginLeft:'5px'}}/> Nam
                        </div>
                        </div>
                        <div className="row col-md-9" style={{float:'right'}}>
                            <button type="button" className="btn btn-secondary m-r-15 ml-2 btn-Widthinfo" onClick={() => this.props.onOpenFormUpdateInfo(false, null, false)}>
                                <i className="fa fa-window-close" aria-hidden="true" /> Đóng
                            </button>
                            <button type="button" className="btn btn-primary btn-Widthinfo" onClick={this.onSubmit}>
                                <i className="fa fa-floppy-o" aria-hidden="true" /> Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}