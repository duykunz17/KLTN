import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import StarRating from '../components/Evaluation/StarRating';
import callAPI from './../utils/connectAPI';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Moment from 'react-moment';

class ScheduleDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleList: [],
            schedule: {}
        }
    }

    componentDidMount() {
        callAPI(`schedule/${this.props.object.match.params.id}`, 'GET', null)
            .then(res => {
                this.setState({
                    scheduleList: res.data.scheduleList,
                    schedule: res.data
                })
            })
            .catch((err) => console.log(err))
    }

    displayScheduleDetail = (scheduleList) => {
        let result = null;
        if (scheduleList.length > 0) {
            result = scheduleList.map((currentSchedule, index) => {
                return (
                    <VerticalTimelineElement
                        key={index}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        date={<Moment format="DD-MM-YYYY">
                            {currentSchedule.date}
                        </Moment>}
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    >
                        {this.listDesName(currentSchedule.desName)}
                    </VerticalTimelineElement>
                );
            });
        }
        return result;
    }

    listDesName = (desName) => {
        return desName.map((currentDesName, index) => {
            return (
                <div key={index}>
                    <h3 className="vertical-timeline-element-title"><i className="fa fa-map-marker"> {currentDesName.name}</i></h3>
                    <div className="rating_days d-flex justify-content">
                        <StarRating
                            numberOfStars={5}
                            value={Math.round(currentDesName.rating)}
                            size={15}
                            editing={false}
                        /> &nbsp;<span><b>({currentDesName.rating})</b></span>
                    </div>
                    <img src={currentDesName.images} alt="" style={{ width: '425px', height: '235px' }}></img>
                    <hr />
                </div>
            )
        })
    }

    render() {
        let { scheduleList, schedule } = this.state;
        return (
            <div>
                <Header />
                <div className="where_togo_area">
                    <h2 style={{ color: 'white', textAlign: 'center' }}>{schedule.title}</h2>
                </div>
                <div style={{ backgroundColor: '#f7fafd' }}>
                    <VerticalTimeline>
                        {this.displayScheduleDetail(scheduleList)}
                        <VerticalTimelineElement
                            iconStyle={{ background: 'rgb(255, 165, 0)', color: '#fff' }}
                            date='Kết thúc chuyến đi'
                        />
                    </VerticalTimeline>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ScheduleDetailPage; 