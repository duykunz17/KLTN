import React, { Component } from 'react';
import Swal from 'sweetalert2';

import callAPI from '../../utils/connectAPI';
import storage from '../../utils/firebaseStorage';

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
            [name] : value
        });
    }

    onSubmit = async () => {
        let { user, name, gender, phone, address, email, file } = this.state;
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
                                    window.location = '/blog'
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
                        window.location = '/blog'
                    }
                })
                .catch(err => console.log(err));
        }
      
    }

    render() {
        let { name, gender, phone, address, email, user } = this.state;
        return (
            <div className="modal fade" id="updateInfoModal" tabIndex="-1" role="dialog" aria-labelledby="updateInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateInfoModalLabel">Thông tin</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mb-padding-top">
                            <div className="row">
                                <div className="col-md-5 m-l-75-uploadInfo">
                                    <div className="ImgPreview">
                                        { this.state.filePath ? 
                                                <img src={this.state.filePath} alt="Info" className="ImgPreview" />
                                            : <img src={user.avatar} alt="Info" className="ImgPreview" />
                                        }
                                    </div>
                                    
                                    <ImageUpload onUploadImage={this.onUploadImage} />

                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="p-tl-info">Họ và tên</label>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <input name="name" type="text" className="input-info"
                                                    value={name} onChange={this.onChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="p-tl-info">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <input name="email" type="text" className="input-info"
                                                    value={email} onChange={this.onChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="p-tl-info">Số điện thoại</label>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <input name="phone" type="text" className="input-info"
                                                    value={phone} onChange={this.onChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="p-tl-address">Địa chỉ</label>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <textarea name="address" type="text" className="input-address"
                                                    value={address} onChange={this.onChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="p-tl-info">Giới tính</label>
                                            </div>
                                        </div>
                                        <div className="form-group p-tl-gender">
                                            <input type="checkbox" name="gender"
                                                value={gender} onChange={this.onChange} checked={gender} /> Nam
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="mod-foot-center">
                                <button type="button" className="btn btn-secondary m-r-15" data-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}