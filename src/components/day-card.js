import React from 'react';
import dayjs from 'dayjs';

import './day-card.scss';


function DayCard(props) {


    return (
        <div className="day-card">
            <div className="day-card__header">{dayjs(props?.day?.date).format('ddd MM.DD.YY').toUpperCase()}</div>
            <div className="mood-rating-widget">
                <div className="mood-rating-widget__header">mood rating</div>
                <div className="mood-rating-widget__value">{props?.day?.mood_score ? props.day.mood_score : "not logged"}</div>
            </div>
            <div className="sleep-widget">
                <div className="sleep-widget__header">hours of sleep last night</div>
                <div className="sleep-widget__value">{props?.day?.sleep_hours ? props.day.sleep_hours : "not logged"}</div>
            </div>
        </div>
    );

}

export default DayCard;