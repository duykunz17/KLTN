import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import callAPI from '../../utils/connectAPI';
import './Schedule.css'
class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            from: [],
            to: [],
            selectFrom: ''
        }
    }

    componentDidMount() {
        callAPI('place/list-place', 'GET', null)
            .then(res => {
                this.setState({
                    from: res.data.places,
                    to: res.data.places
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

    listDate = () => {
        var dateItems = [];
        var start = new Date(this.state.startDate);
        var end = new Date(this.state.endDate);
        var loop = new Date(start);
        dateItems.push(<DatePicker selected={start} dateFormat="dd/MM/yyyy" minDate={start} maxDate={start} />)
        while (loop < end) {
            let newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
            dateItems.push(<DatePicker selected={newDate}
                dateFormat="dd/MM/yyyy"
                minDate={newDate}
                maxDate={newDate}
                timeIntervals={30}
                timeCaption="Time"
                showTimeSelect
            />);
        }
        // console.log(dateItems);
        return <div>{dateItems}</div>;
        //console.log(this.state.endDate.toString().substr(4,12)) 
    }

    listFrom = () => {
        return this.state.from.map((currentFrom, index) => {
            return (
                <option value={currentFrom.name}>
                    {currentFrom.name}
                </option>
            )
        })
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    listTo = (selectFrom) => {
        var tempTo = this.state.to.filter(item => item.name !== selectFrom);
        console.log(tempTo);
        return tempTo.map((currentTo, index) => {
            return (
                <option value={currentTo.name}>{currentTo.name}</option>
            )
        })
    }

    render() {
        let { startDate, endDate, selectFrom } = this.state
        console.log(selectFrom)
        return (
            <div>
                {/* Khoảng ngày
                <DatePicker
                    minDate={this.state.startDate}
                    maxDate={this.state.endDate}
                    showDisabledMonthNavigation
                    dateFormat="dd/MM/yyyy">

                </DatePicker> */}

                {/* Ngày 1:
                <DatePicker
                selected={startDate}
                minDate={this.state.startDate}
                maxDate={this.state.endDate}
                showDisabledMonthNavigation
                dateFormat="dd/MM/yyyy"
                />

                Ngày 2:
                
                <input type="text" value={this.addDays(1)}/>
                <DatePicker
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                showTimeSelect
                showTimeSelectOnly
                showDisabledMonthNavigation
                /> */}
                <div className="where_togo_area">
                    <div className="row justify-content-center">
                        <div className="container">
                            <h2 style={{ color: 'white', textAlign: 'center' }}>TẠO LỊCH CHO CHUYẾN ĐI</h2>
                        </div>
                    </div>
                </div>

                <div className="container-fluid bg-image">
                    <div className="container booking">
                        <h1></h1>
                        <form className="form-booking">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="selectFrom">ĐIỂM ĐI</label>
                                    <div className="input-group mb-2">
                                        <select value={selectFrom}
                                            onChange={(event) => this.onChange(event)}
                                            name="selectFrom"
                                            onClick={() => { return <select> {this.listTo(selectFrom)}</select> }}
                                            className="form-control" id="selectFrom">
                                            {this.listFrom()}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="selectTo">ĐIỂM ĐẾN</label>
                                    <div className="input-group mb-2">

                                        <select className="form-control" id="selectTo">
                                            {this.listTo(selectFrom)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="startDate">NGÀY ĐI</label>
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
                                    <label htmlFor="startDate">NGÀY VỀ</label>
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
                                {this.listDate()}
                            </div>
                            <div className="form-row">
                                <div className="form-group col text-center">
                                    <button type="submit" className="btn btn-warning">TẠO LỊCH</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Schedule;