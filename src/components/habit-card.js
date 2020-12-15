import React from 'react'

import './habit-card.scss';


function HabitCard(props) {

    const localHandleUpdateHabit = () => {
        props.handleUpdateHabit({
            id: props.habit.id,
            user_id: props.userId,
            title: props.habit.title,
            archived: props.habit.archived ? false : true 
        })
    }

    return (
        <div className="habit-card">
            <div className="habit-card__header">{props.habit.title}</div>
            <button className="habit-card__button" onClick={localHandleUpdateHabit}>{props.habit.archived ? 'unarchive' : 'archive'}</button>
        </div>
    );

}

export default HabitCard;