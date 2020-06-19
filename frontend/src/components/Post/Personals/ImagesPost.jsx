import React, { Component } from 'react';
import callAPI from '../../../utils/connectAPI';
import { Link } from 'react-router-dom';

class ImagesPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ account });
        callAPI('post/account/' + account._id, 'GET', null)
            .then(res => {
                this.setState({ posts: res.data });
            }).catch((err) => { console.log(err) })
    }

    displayImagesPost = (images) => {
        return images.map((img, index) => {
            console.log(img)
            return (
                <img key={index} src={img} className="img-thumbnail" alt=""/>
            )
        })
    }

    render() {
        let { posts } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="mdb-lightbox">
                        {posts.map((item, index) => {
                            return (
                                <figure key={index} className="col-sm">
                                    <Link to={'post-detail/' + item._id} >
                                       {this.displayImagesPost(item.images)}
                                    </Link>
                                </figure>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImagesPost;