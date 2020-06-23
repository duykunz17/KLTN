import React, { Component } from 'react';
import callAPI from '../../utils/connectAPI';
class FormAddPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map(),
            places: [],
            listDate: []
        }
    }
    
    componentDidMount() {
        callAPI('place', 'GET', null)
            .then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    this.setState({ checkedItems: this.state.checkedItems.set(res.data[i].name, { status: false, index: i }) });
                }
                this.setState({ places: res.data });
                //console.log(res.data)
            })
            .catch((err) => { console.log(err) })
    }

    handleChange = async (event, index) => {
        let item = event.target.value;
        let isChecked = event.target.checked;

        let places = this.state.places;
        if (isChecked === true) {
            await callAPI(`place/${places[index]._id}`, 'GET', null)
                .then(res => {
                    places[index].limit = 6;
                    places[index].destination = res.data.destination;

                    this.setState({ places });
                })
                .catch((err) => console.log(err));
        }
        else {
            var temp = this.state.listDate.map(item => {
                item.desName = item.desName.filter(el => {
                    return el.place_id !== places[index]._id
                });
                return item;
            })
            this.setState({
                listDate: temp
            });
        }

        this.setState({ checkedItems: this.state.checkedItems.set(item, { status: isChecked, index: index }) });
    }

    listPlace = () => {
        if (this.state.checkedItems.size > 0) {
            let temp = Array.from(this.state.checkedItems);
            return temp.map((item, index) => {
                return (
                    <div key={index} className="form-check" style={{ float: 'left', width: '25%' }}>
                        <label>
                            <input type="checkbox" name="checkedItems" value={item[0]} checked={item[1].status} onChange={(event) => this.handleChange(event, index)} /><span className="label-text"> {item[0]}</span>
                        </label>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div className="card w-100 mb-3" style={{ borderRadius: '10px' }}>
            <p className="text-center mt-3 " style={{ fontWeight: 'bold', fontSize: '30px', color: 'black' }}> Các địa điểm ở Việt Nam </p>
            <hr />
            <div className="row">
                {this.listPlace()}
            </div>
        </div>
        );
    }
}

export default FormAddPlace;