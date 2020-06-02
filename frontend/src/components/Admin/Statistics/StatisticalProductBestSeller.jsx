import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import DatePicker from 'react-datepicker';

import callAPI from '../../../utils/connectAPI';

class StatisticalProductBestSeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            years: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: [],
                        borderColor: "#C2E17A",
                        borderWidth: 2,
                        data: []
                    }
                ]
            },
            months: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: [],
                        borderColor: "#5FE161",
                        borderWidth: 2,
                        data: []
                    }
                ]
            },
            days: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: [],
                        borderColor: "#14EDF8",
                        borderWidth: 2,
                        data: []
                    }
                ]
            }
        }
    }

    handlingStatical = (date) => {
        callAPI('admin/statistical/product/sell-day', 'POST', { date })
            .then(res => this.onSetStatisticalDays(res.data));
        
        callAPI('admin/statistical/product/sell-month', 'POST', { date })
            .then(res => this.onSetStatisticalMonths(res.data));
        
        callAPI('admin/statistical/product/sell-year', 'POST', { date })
            .then(res => this.onSetStatisticalYears(res.data));
    }

    componentDidMount() {
        this.handlingStatical(this.state.startDate);
    }

    /** set state StatisticalDay */
    onSetStatisticalDays = (data) => {
        let backgroundColor = [ "#F2281E", "#F2E81E", "#3e95cd", "#8e5ea2", "#F21EC8",
                                "#3cba9f", "#e8c3b9", "#16F033", "#c45850", "#F0A716" ], i = 0;
        let labels = [], backgroundColorChart = [], dataChart = [];
        data.forEach(el => {
            labels.push(el._id);
            backgroundColorChart.push(backgroundColor[i++]);
            dataChart.push(el.sumPurchase);
        });

        let days = {labels, datasets: [
            {
                label: "Đã bán",
                fill: false,
                lineTension: 0.5,
                backgroundColor: backgroundColorChart,
                borderColor: "#A69494",
                borderWidth: 2,
                data: dataChart
            }]
        };

        this.setState({ days });
    }
    onSetStatisticalMonths = (data) => {
        let backgroundColor = [ "#F2281E", "#F2E81E", "#3e95cd", "#8e5ea2", "#F21EC8",
                                "#3cba9f", "#e8c3b9", "#16F033", "#c45850", "#F0A716",
                                "#FCFC78", "#042F04", "#E2C3E4", "#3E1C87", "#6AAC0D" ], i = 0;
        let labels = [], backgroundColorChart = [], dataChart = [];
        data.forEach(el => {
            labels.push(el._id);
            backgroundColorChart.push(backgroundColor[i++]);
            dataChart.push(el.sumPurchase);
        });

        let months = {labels, datasets: [
            {
                label: "Đã bán",
                fill: false,
                lineTension: 0.5,
                backgroundColor: backgroundColorChart,
                borderColor: "#5FE161",
                borderWidth: 2,
                data: dataChart
            }]
        };

        this.setState({ months });
    }
    onSetStatisticalYears = (data) => {
        let backgroundColor = [ "#F2281E", "#F2E81E", "#3e95cd", "#8e5ea2", "#F21EC8",
                                "#3cba9f", "#e8c3b9", "#16F033", "#c45850", "#F0A716",
                                "#FCFC78", "#042F04", "#E2C3E4", "#3E1C87", "#6AAC0D" ], i = 0;
        let labels = [], backgroundColorChart = [], dataChart = [];
        data.forEach(el => {
            labels.push(el._id);
            backgroundColorChart.push(backgroundColor[i++]);
            dataChart.push(el.sumPurchase);
        });

        let years = {labels, datasets: [
            {
                label: "Đã bán",
                fill: false,
                lineTension: 0.5,
                backgroundColor: backgroundColorChart,
                borderColor: "#C2E17A",
                borderWidth: 2,
                data: dataChart
            }]
        };

        this.setState({ years });
    }

    onChange = (date) => {
        this.setState({
            startDate: date
        });
        this.handlingStatical(date);
    };
    render() {
        let {startDate, years, months, days} = this.state;
        console.log(startDate)
        return (
            <div style={{marginBottom: '60px'}}>
                <div style={{textAlign: 'center', marginTop: '50px'}} >
                    <h3>
                        Chọn thời điểm thống kê: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => this.onChange(date)}
                            maxDate={new Date()}
                            showDisabledMonthNavigation
                            dateFormat="dd/MM/yyyy"
                            popperPlacement='bottom'
                            popperModifiers={{
                                flip: {
                                    behavior: ['bottom'] // don't allow it to flip to be above
                                },
                                preventOverflow: {
                                    enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                                },
                                hide: {
                                    enabled: false // turn off since needs preventOverflow to be enabled
                                }
                            }}
                        />
                    </h3>
                </div>
                <MDBContainer>
                    <h3 className="mt-5" style={{marginBottom: '20px'}}>Thống kê sản phẩm bán chạy trong ngày </h3>
                    <Line data={days} options={{ legend: { display: false } }} />

                    <h3 className="mt-5" style={{marginBottom: '20px'}}>Thống kê sản phẩm bán chạy trong tháng </h3>
                    <Line data={months} options={{ legend: { display: false } }} />

                    <h3 className="mt-5" style={{marginBottom: '20px'}}>Thống kê sản phẩm bán chạy trong năm </h3>
                    <Line data={years} options={{ legend: { display: false } }} />                    
                </MDBContainer>
            </div>
        );
    }
}

export default StatisticalProductBestSeller;