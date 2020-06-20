import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ImagesPost extends Component {

    displayImagesPost = (images) => {
        return images.map((img, index) => {
            return (
                <img key={index} src={img} className="col-md-4" style={{ height: '70px', marginBottom: '25px' }} alt="err" />
            )
        })
    }

    render() {
        let { posts } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="mdb-lightbox">
                        <figure>
                            {posts.map((item, index) => {
                                return (
                                    <Link key={index} to={'post-detail/' + item._id} >
                                        {this.displayImagesPost(item.images)}
                                    </Link>
                                )
                            })}
                        </figure>

                    </div>
                </div>
            </div>
        )
    }
}

export default ImagesPost;