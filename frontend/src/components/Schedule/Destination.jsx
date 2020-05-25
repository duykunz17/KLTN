import React, { Component } from 'react';

class Destination extends Component {
    render() {
        let {des} = this.props;
        return (
            <div className="col-6" >
                    <div className="single_place" >
                        <div className="thumb">
                            <img src={des.images} alt="" style={{width: '350px'}}/>
                            <button className="btn btn-primary" type="button" onClick={() => this.props.onChoose(des)}><i className="fa fa-plus"></i> Chọn</button>
                            
                        </div>
                        <div className="place_info">
                            <b>{des.name}</b> 

                        </div>
                    </div>
            </div>
        );
    }
}

export default Destination;