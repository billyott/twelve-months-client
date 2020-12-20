import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import DayDetailsCard from '../components/day-details-card';
import './day-details-container.scss';


class DayDetailsContainer extends React.Component{

    state = {
        day: {}
    }

    componentDidMount() {
        this.getDay()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.date !== this.props.match.params.date) {
            this.getDay()
        }
    }

    getDay = () => {
        fetch(`http://localhost:3000/days?user_id=${this.props.userId}&start_date=${this.props.match.params.date}&end_date=${this.props.match.params.date}`)
        .then(resp => resp.json())
        .then(days => {
            this.setState({day: days[0]})
        })
    }

    render() {
        return (
            <div className="day-details-container">
                <div className="day-details-container__header">DAY DETAILS</div>
                <DayDetailsCard day={this.state.day} />
                <div className="day-details-container__link-container">
                    <Link className="day-details-container__link" to={`/days/${dayjs(this.state.day.date).subtract(1, 'day').format('YYYY-MM-DD')}`}>previous day</Link>
                    <Link className="day-details-container__link" to={`/days/${dayjs(this.state.day.date).add(1, 'day').format('YYYY-MM-DD')}`}>next day</Link>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(withRouter(DayDetailsContainer));