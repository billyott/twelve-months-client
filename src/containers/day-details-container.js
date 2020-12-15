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
                <DayDetailsCard day={this.state.day} />
                <Link className="day-details-container__link" to={`/days/${dayjs(this.state.day.date).add(1, 'day').format('YYYY-MM-DD')}`}>Next Day</Link>
                <Link className="day-details-container__link" to={`/days/${dayjs(this.state.day.date).subtract(1, 'day').format('YYYY-MM-DD')}`}>Previous Day</Link>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(withRouter(DayDetailsContainer));