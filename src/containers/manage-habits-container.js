import React from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../redux/actions';
import HabitCard from '../components/habit-card';
import './all-days-container.scss';


class ManageHabitsContainer extends React.Component{

    state = {
        selectedHabits: 'current habits',
        showAddHabitForm: false,
        habitTitle: ''
    };

    handleCreateHabit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/habits', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: this.state.habitTitle, user_id: this.props.user.id, archived: false})
        })
        .then(resp => resp.json())
        .then(newHabit => {
            this.props.handleAddHabitViaUpdateUser(newHabit.user.id)
            this.setState({showAddHabitForm: false})
        })
    }

    handleShowAddHabitForm = () => {
        this.setState(prevState => {
            return ({showAddHabitForm: !prevState.showAddHabitForm})
        })
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
                        <select className="manage-habits-container__filter" name="selectedHabits" value={this.state.selectedHabits} onChange={this.handleInputUpdate}>
                            <option value="current habits">current habits</option>
                            <option value="all habits">all habits</option>
                            <option value="archived habits">archived habits</option>
                        </select>
                    </div>
                </div>
                <ul className="manage-habits-container__habit-cards-list">
                    {this.props.user.habits.map(habit => <li key={habit.id}><HabitCard habit={habit} /></li>)}
                </ul>
                {this.state.showAddHabitForm ? 
                <form className="manage-habits-container__form" onSubmit={this.handleCreateHabit}>
                    <input className="manage-habits-container__input" name="habitTitle" type="text" placeholder="enter habit" value={this.state.habitTitle} onChange={this.handleInputUpdate}></input>
                    <button className="manage-habits-container__button">Submit</button>
                </form> : null}
                <button className="manage-habits-container__button" onClick={this.handleShowAddHabitForm}>add habit</button>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {handleAddHabitViaUpdateUser: (userId) => dispatch(updateUser(userId))}
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHabitsContainer);