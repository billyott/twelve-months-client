import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

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
                    {this.state.days.length > 0 ? <DayDetailsCard day={this.state.days[3]} /> : <Loader active inline='centered' />}
                </div>
                <div className="homepage-container__bottom">
                    <div className="homepage-container__header">LAST THREE DAYS</div>
                    <NavLink to="/days" className="homepage-container__link">see all days</NavLink>
                    {this.state.days.length > 0 ? 
                    <ul className="homepage-container__day-cards-list">
                        {this.state.days.slice(0,3).map(day => <li className="homepage-container__day-card-list-item" key={day.id}><DayCard day={day}/></li>)}
                    </ul>
                    : 
                    <Loader active inline='centered' />
                    }
                </div>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(HomepageContainer);