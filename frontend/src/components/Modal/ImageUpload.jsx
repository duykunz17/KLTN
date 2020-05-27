import React, { Component } from 'react';

export default class ImageUpload extends Component {

    onChangeImage = (event) => {
        this.props.onUploadImage(event);
    };

    render() {
        return (
            <div className="uploadAvatar">
                <label>Ảnh đại diện</label>
                <div className="input-group-avatar">
                    <label className="clicked-btn-post">
                        <input name="avatar" className="inputFile-avatar" type="file" onChange={this.onChangeImage} />
                        <span className="btn btn-primary" >Chọn ảnh</span>
                    </label>
                </div>
            </div>
        );
    }
}