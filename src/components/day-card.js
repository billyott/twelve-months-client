import React from 'react'

import MoodRatingWidget from './mood-rating-widget';
import SleepWidget from './sleep-widget';
import './day-card.scss';


function DayCard(props) {


    return (
        <div className="day-card">
            <div className="day-card__header">PLACEHOLDER FOR DATE</div>
            <MoodRatingWidget />
            <SleepWidget />
        </div>
    );

}

export default DayCard;