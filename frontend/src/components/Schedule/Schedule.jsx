import React, { Component } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';

import "react-datepicker/dist/react-datepicker.css";

import Destination from './Destination';
import './Schedule.css';

import callAPI from '../../utils/connectAPI';
// import ChooseDate from './ChooseDate';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startDate: new Date(),
            endDate: new Date(),
            place: [],
            destination: [],
            checkedItems: new Map(),
            statusBtn: false,
            listDate: [],
            selectDes: [],
            hashtag: [],
            radio: 0,
            hover: -1
        }
    }

    componentDidMount() {
        callAPI('place', 'GET', null)
            .then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    this.setState({ checkedItems: this.state.checkedItems.set(res.data[i].name, { status: false, index: i }) });
                }
                this.setState({
                    place: res.data
                });
                //console.log(res.data)
            })
            .catch((err) => { console.log(err) })
    }

    onChangeStartDate = date => {
        this.setState({
            startDate: date,
            endDate: date
        });
    };

    onChangeFinishDate = date => {
        this.setState({
            endDate: date
        });
    };

    addDays = (days) => {
        let date = new Date(this.state.startDate);
        date.setDate(date.getDate() + days);
        return date.toString().substr(4, 12);
    }

    onChangeBtn = (statusBtn) => {
        if (statusBtn)
            this.setStateEmpty();
        else {
            if (this.state.title === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tên hành trình không rỗng'
                })
            }
            else {
                let checkedBOX = false, checkedItems = Array.from(this.state.checkedItems);
                checkedItems.forEach(el => {
                    if (el[1].status === true)
                        return checkedBOX = true;
                })

                if (checkedBOX) {
                    var dateItems = [];
                    var start = new Date(this.state.startDate);
                    var end = new Date(this.state.endDate);
                    var loop = new Date(start);
                    var newDate = new Date();
                    dateItems.push({ date: new Date(start).toString().substr(4, 20), desName: [] });
                    while (loop < end) {
                        newDate = loop.setDate(loop.getDate() + 1);
                        let convert = new Date(newDate);
                        loop = new Date(newDate);
                        dateItems.push({
                            date: new Date(convert).toString().substr(4, 20),
                            desName: []
                        });
                    }
                    // console.log(dateItems);

                    this.setState({
                        listDate: dateItems,
                        statusBtn: !this.state.statusBtn
                    });
                }
                else
                    Swal.fire({
                        icon: 'warning',
                        title: 'Bạn chưa chọn địa điểm'
                    })
            }
        }
    }

    handleChange = (event, index) => {
        const item = event.target.value;
        const isChecked = event.target.checked;
        this.setState({ checkedItems: this.state.checkedItems.set(item, { status: isChecked, index: index }) });
    }

    listPlaceSelected = () => {
        if (this.state.statusBtn === true) {
            if (this.state.checkedItems.size > 0) {
                let keys = Array.from(this.state.checkedItems);

                return keys.map((item, index) => {
                    let result = null;
                    if (item[1].status === true) {
                        result = (
                            <div key={index}>
                                <div style={{ textAlign: 'center', padding: '20px 0px 20px 0px' }}>
                                    <b>Điểm đến du lịch ở {this.state.place[item[1].index].name}</b>
                                </div>
                                <div className="row">
                                    {this.listDestination(this.state.place[item[1].index].destination)}
                                </div>
                                <hr className="my-2" />
                            </div>
                        )
                    }
                    return result;
                })
            }
        }
    }

    listDestination = (destination) => {
        return destination.map((des, index) => {
            return (
                <Destination key={index} des={des} onChoose={this.onChoose} />
            )
        })
    }

    onChoose = (des) => {
        var temp = this.state.listDate.map((item, index) => {
            if (this.state.radio === -1)
                Swal.fire({
                    icon: 'warning',
                    title: 'Bạn chưa chọn ngày đến địa điểm này'
                })
            else if (index === this.state.radio) {
                let flag = false;
                if (item.desName.length > 0)
                    item.desName.forEach(el => {
                        console.log(el._id)

                        if (el._id === des._id)
                            return flag = true;
                    });

                if (flag)
                    Swal.fire({
                        icon: 'warning',
                        title: 'Bạn đã chọn điểm này'
                    })
                else
                    item.desName.push(des);
            }
            return item;
        })
        this.setState({
            listDate: temp
        });
    }

    onClickDelete = (des, index) => {
        var temp = this.state.listDate.map((item, i) => {
            if (index === i) {
                item.desName = item.desName.filter(el => {
                    return el._id !== des._id
                });
            }
            return item;
        })
        this.setState({
            listDate: temp
        });
    }

    listDes = (des, index) => {
        return des.map((item, k) => {
            return (
                <tr key={k}>
                    <td>{item.name}</td>
                    <td>
                        <button type="button"><i className="fa fa-trash" onClick={() => this.onClickDelete(item, index)} /></button>
                    </td>
                </tr>
            )
        })
    }

    setStateEmpty = () => {
        let checkedItems = this.state.checkedItems;
        for (var el of checkedItems)
            this.setState({ checkedItems: checkedItems.set(el[0], { status: false, index: el[1].index }) });

        this.setState({
            title: '',
            startDate: new Date(),
            endDate: new Date(),
            destination: [],
            statusBtn: false,
            listDate: [],
            selectDes: [],
            hashtag: [],
            radio: 0,
            hover: -1
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        let { checkedItems, hashtag, title, startDate, endDate, listDate } = this.state;
        let flag = true;
        for (let i = 0; i < listDate.length; i++) {
            if (listDate[i].desName.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Bạn chưa chọn địa điểm cho ngày ' + listDate[i].date.toString().substr(0, 11)
                })

                return flag = false;
            }
        }

        if (flag) {
            for (var el of checkedItems) {
                if (el[1].status === true)
                    this.setState({
                        hashtag: hashtag.push(el[0])
                    });
            }
            var schedule = {
                account: this.props.account,
                title: title,
                startDate: startDate,
                endDate: endDate,
                scheduleList: listDate,
                hashtag: hashtag
            }
            console.log(schedule);
            callAPI('schedule/add', 'POST', schedule)
                .then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tạo lịch trình thành công',
                    });

                    this.setStateEmpty();
                })
                .catch(err => console.log(err))
        }
    }

    onChangeRadio = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name]: Number(value)
        });
    }
    onSetHover = (value) => {
        this.setState({ hover: value });
    }
    onAddDate = () => {
        let end = new Date(this.state.endDate);
        let convert = new Date(end.setDate(end.getDate() + 1));
        let dateItems = this.state.listDate;
        dateItems.push({ date: new Date(convert).toString().substr(4, 20), desName: [] });
        this.setState({
            endDate: convert,
            listDate: dateItems
        })
    }
    date = () => {
        let { radio, hover } = this.state;
        return this.state.listDate.map((d, index) => {
            let styleColor = (hover === index || radio === index) ? "#ffc107" : "gray";
            return (
                <div key={index} className="accordion md-accordion accordion-blocks" id="accordionEx78" role="tablist" aria-multiselectable="true">
                    <div className="card">
                        <label>
                            <input type="radio" name="radio" value={index} onChange={(event) => this.onChangeRadio(event)} />
                            <div className="card-header choose-date" style={{ background: styleColor }} role="tab" id="heading79"
                                onMouseLeave={() => this.onSetHover(-1)}
                                onMouseEnter={() => this.onSetHover(index)}
                            >
                                <h5 className="mt-1 mb-0">
                                    <span>
                                        &nbsp;
                                        <Moment format="DD/MM/YYYY">
                                            {d.date}
                                        </Moment>
                                    </span>
                                </h5>
                            </div>
                        </label>
                        <div id={d} className="collapse show" role="tabpanel" aria-labelledby="heading79" data-parent={'#' + { index }}>
                            <div className="card-body">
                                <div className="table-responsive mx-3">
                                    <table className="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th className="th-lg">Tên điểm đến</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.listDes(d.desName, index)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
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

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    render() {
        let { startDate, endDate, statusBtn } = this.state
        let titleStatusBtn = statusBtn ? 'hủy tạo' : 'tạo lịch', iconStatusBtn = statusBtn ? 'fa-times-circle-o' : 'fa-plus-circle';
        // console.log(this.state.checkedItems)
        return (
            <div>
                <div className="where_togo_area">
                    <div className="row justify-content-center">
                        <div className="container">
                            <h2 style={{ color: 'white', textAlign: 'center' }}>TẠO LỊCH CHO CHUYẾN ĐI</h2>
                        </div>
                    </div>
                </div>

                <div className="container-fluid bg-image">
                    <div className="container booking">
                        <h3>Chọn tỉnh thành bạn muốn khám phá nè</h3>
                        <form className="form-booking">
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="title">Tên chuyến đi: </label>
                                    <input type="text" className="form-control"
                                        value={this.state.title}
                                        name="title"
                                        placeholder="Nhập tên chuyến đi của bạn"
                                        onChange={(event) => this.onChange(event)}
                                    ></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Chọn điểm đến muốn khám phá: </label>
                                    <div className="input-group mb-2">
                                    </div>
                                    {this.listPlace()}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="startDate">Chọn ngày đi: </label>
                                    <div className="input-group mb-2">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={date => this.onChangeStartDate(date)}
                                            minDate={new Date()}
                                            showDisabledMonthNavigation
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="startDate">Chọn ngày về: </label>
                                    <div className="input-group mb-2">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={date => this.onChangeFinishDate(date)}
                                            minDate={this.state.startDate}
                                            showDisabledMonthNavigation
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col text-center" style={{ marginBottom: '-80px' }}>
                                    <button type="button" className="btn btn-warning" onClick={() => this.onChangeBtn(statusBtn)} style={{ textTransform: 'uppercase' }} >
                                        <i className={`fa ${iconStatusBtn}`} /> {titleStatusBtn}
                                    </button>
                                </div>
                            </div>
                            {
                                this.state.statusBtn ? (
                                    <div style={{ marginBottom: '35px' }}>
                                        <div className="form-row">
                                            <div className="form-group col d-flex justify-content-end" style={{ marginBottom: '-80px' }}>
                                                <button type="submit" className="btn btn-info" onClick={this.onSubmit} style={{ textTransform: 'uppercase' }} >
                                                    <i className="fa fa-save"></i> hoàn thành</button>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-4 style-choose-date">
                                                {this.date()}
                                                <button type="button" className="btn btn-warning" onClick={() => this.onAddDate()} style={{float: 'right', width: '200px'}} >
                                                    <i className='fa fa-plus-circle' /> Thêm ngày
                                                </button>
                                            </div>
                                            <div className="col-8" style={{ border: '0.5px solid black' }}>
                                                {this.listPlaceSelected()}
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Schedule;