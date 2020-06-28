import React, { Component } from 'react';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import DatePicker from 'react-datepicker';

import callAPI from '../../../utils/connectAPI';

export default class RevenueStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            years: {
                labels: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
                            'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'],
                datasets: [
                    {
                        label: '',
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: []
                    }
                ]
            }
        }
    }

    handlingStatical = (date) => {        
        callAPI('admin/statistical/renvenue-sale', 'POST', { date })
            .then(res => this.onSetStatisticalYears(res.data));
    }

    componentDidMount() {
        this.handlingStatical(this.state.startDate);
    }

    /** set state StatisticalDay */
    onSetStatisticalYears = (data) => {
        let dataChart = [], lables = this.state.years.labels;

        // run lables according month
        for (let i = 1; i <= lables.length; i++)
            data.forEach(el => {
                if (el._id === i)
                    dataChart[i - 1] = el.total;
            });

        let years = {labels: this.state.years.labels, datasets: [
            {
                label: "doanh số",
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
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

        if (date)
            this.handlingStatical(date);
    };
    render() {
        let {startDate, years} = this.state;
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
                            dateFormat="yyyy"
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
                    <h3 className="mt-5" style={{marginBottom: '20px'}}>Thống kê doanh thu theo năm {startDate ? startDate.getFullYear() : ''} </h3>
                    <Bar data={years} options={{ legend: { display: false } }} />                    
                </MDBContainer>
            </div>
        );
    }
}