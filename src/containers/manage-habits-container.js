import React from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../redux/actions';
import HabitCard from '../components/habit-card';
import './manage-habits-container.scss';


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
            this.props.handleAddHabitViaUpdateUser(newHabit.user)
            this.setState({showAddHabitForm: false, habitTitle: ''})
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

    handleUpdateHabit = (habitObj) => {
        fetch(`http://localhost:3000/habits/${habitObj.id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(habitObj)
        })
        .then(resp => resp.json())
        .then(updatedHabit => {
            this.props.handleAddHabitViaUpdateUser(updatedHabit.user)
        })
    }

    selectedHabits = () => {
        if (this.state.selectedHabits === 'current habits') {
            return this.props.user.habits.filter(habit => habit.archived === false)
        } else if (this.state.selectedHabits === 'archived habits') {
            return this.props.user.habits.filter(habit => habit.archived === true)
        } else {
            return this.props.user.habits
        }

    }

    render () {
        return (
            <div className="manage-habits-container">
                <div className="manage-habits-container__header-items">
                    <div className="manage-habits-container__header">MANAGE HABITS</div>
                    <div className="manage-habits-container__filters">
                        <label className="manage-habits-container__label">select habits</label>
                        <select className="manage-habits-container__filter" name="selectedHabits" value={this.state.selectedHabits} onChange={this.handleInputUpdate}>
                            <option value="current habits">current habits</option>
                            <option value="all habits">all habits</option>
                            <option value="archived habits">archived habits</option>
                        </select>
                        <form className="manage-habits-container__form" onSubmit={this.handleCreateHabit}>
                            <input className="manage-habits-container__input" name="habitTitle" type="text" placeholder="enter new habit" value={this.state.habitTitle} onChange={this.handleInputUpdate}></input>
                            <button className="manage-habits-container__button-submit">add habit</button>
                        </form>
                    </div>
                </div>
                <ul className="manage-habits-container__habit-cards-list">
                    {this.selectedHabits().map(habit => <li className="manage-habits-container__habit-card-li" key={habit.id}><HabitCard habit={habit} userId={this.props.user.id} handleUpdateHabit={this.handleUpdateHabit} /></li>)}
                </ul>
                {/* {this.state.showAddHabitForm ? 
                <form className="manage-habits-container__form" onSubmit={this.handleCreateHabit}>
                    <input className="manage-habits-container__input" name="habitTitle" type="text" placeholder="enter habit" value={this.state.habitTitle} onChange={this.handleInputUpdate}></input>
                    <button className="manage-habits-container__button-submit">add habit</button>
                </form> : null}
                <button className="manage-habits-container__button" onClick={this.handleShowAddHabitForm}>+</button> */}
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