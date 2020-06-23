import React, { Component } from 'react';
import FormAddPlace from './FormAddPlace';
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenForm: false
        }
    }

    onOpenFormAddPlace = (isOpen) => {
        this.setState({ isOpenForm: isOpen });
    }

    render() {
        let { isOpenForm } = this.state;
        return (
            <div className="popular_places_area" style={{ textAlign: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div style={{ marginBottom: '10px' }} className="ml-2 mr-2 mb-3">
                            <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => this.onOpenFormAddPlace(!isOpenForm)}>Chọn nơi bạn đã đến</button>
                        </div>

                        {isOpenForm ? <FormAddPlace /> : null}

                        <div className="col-lg-4 col-md-6" >
                            

                        </div>

                        <div className="col-lg-8 col-md-6" >

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gallery;