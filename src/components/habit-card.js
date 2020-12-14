import React from 'react'

import './habit-card.scss';


function HabitCard(props) {


    return (
        <div className="habit-card">
            <div className="habit-card__header">{props.habit.title}</div>
            <button className="habit-card__button">archive</button>
        </div>
    );

}

export default HabitCard;