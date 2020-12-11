import React from 'react';

import DayDetailsCard from '../components/day-details-card';
import './day-details-container.scss';


function DayDetailsContainer() {

    return (
        <div className="day-details-container">
            <DayDetailsCard />
            <button className="day-details-container__button">Next Day</button>
            <button className="day-details-container__button">Previous Day</button>
        </div>
    );

}

export default DayDetailsContainer;