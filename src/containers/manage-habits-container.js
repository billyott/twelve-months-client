import React from 'react';

import HabitCard from '../components/habit-card'
import './all-days-container.scss';


class ManageHabitsContainer extends React.Component{

    state = {
        selectedHabits: ''
    }

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render () {
        return (
            <div className="manage-habits-container">
                <div className="manage-habits-container__header-items">
                    <div className="manage-habits-container__header">Manage Habits</div>
                    <div className="manage-habits-container__filters">
                        <label className="manage-habits-container__label">select habits</label>
                        <select className="manage-habits-container__filter" defaultValue="current habits" onChange={this.handleInputUpdate}>
                            <option value="current habits">current habits</option>
                            <option value="all habits">all habits</option>
                            <option value="archived habits">archived habits</option>
                        </select>
                    </div>
                </div>
                <ul className="manage-habits-container__habit-cards-list">
                    <li><HabitCard /></li>
                    <li><HabitCard /></li>
                    <li><HabitCard /></li>
                    <li><HabitCard /></li>
                    <li><HabitCard /></li>
                    <li><HabitCard /></li>
                </ul>
            </div>
        );
    }

}

export default ManageHabitsContainer;