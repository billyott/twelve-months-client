import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import DayDetailsCard from '../components/day-details-card';
import './day-details-container.scss';


class DayDetailsContainer extends React.Component{

    state = {
        day: {}
    }

    componentDidMount() {
        this.getDay()
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
                <button className="day-details-container__button">Next Day</button>
                <button className="day-details-container__button">Previous Day</button>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(withRouter(DayDetailsContainer));