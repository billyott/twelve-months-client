import React from 'react';

import DayCard from '../components/day-card'
import './all-days-container.scss';


class AllDaysContainer extends React.Component{


    render () {
        return (
            <div className="all-days-container">
                <div className="all-days-container__header-items">
                    <div className="all-days-container__header">PLACEHOLDER FOR MONTH</div>
                    <div className="all-days-container__filters">
    
                    </div>
                </div>
                <ul className="all-days-container__day-cards-list">
                    <li><DayCard /></li>
                    <li><DayCard /></li>
                    <li><DayCard /></li>
                </ul>
            </div>
        );
    }

}

export default AllDaysContainer;