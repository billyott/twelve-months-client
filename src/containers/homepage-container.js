import React from 'react';
import { connect } from 'react-redux';

import DayDetailsCard from '../components/day-details-card';
import DayCard from '../components/day-card';
import './homepage-container.scss';


class HomepageContainer extends React.Component {

    state = {
        days: []
    }
    
 
    componentDidMount() {

        fetch(`http://localhost:3000/days?user_id=${this.props.userId}`)
        .then(resp => resp.json())
        .then(days => this.setState({days: days}))

    }

    render() {
        return (
            <div className="homepage-container">
                <div className="homepage-container__top">
                    <div className="homepage-container__header">TODAY</div>
                    <DayDetailsCard day={this.state.days[0]} /> 
                </div>
                <div className="homepage-container__bottom">
                    <div className="homepage-container__header">Past Three Days</div>
                    <a className="homepage-container__link" href="/">see all days</a>
                    <ul className="homepage-container__day-cards-list">
                        {this.state.days.slice(1).map(day => <li key={day.id}><DayCard day={day}/></li>)}
                    </ul>
                </div>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(HomepageContainer);