import React from 'react';

import MoodRatingWidget from './mood-rating-widget';
import SleepWidget from './sleep-widget';
import './day-card.scss';


function DayCard(props) {


    return (
        <div className="day-card">
            <div className="day-card__header">{props.date.format('ddd MM.DD.YY').toUpperCase()}</div>
            <MoodRatingWidget />
            <SleepWidget />
        </div>
    );

}

export default DayCard;