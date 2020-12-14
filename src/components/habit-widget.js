import React from 'react';

import './habit-widget.scss';


class HabitWidget extends React.Component {

    state = {
        checked: false,
        dayHabitId: null
    };

    componentDidMount() {
        fetch(`http://localhost:3000/day_habits?habit_id=${this.props.habit.id}&day_id=${this.props.dayId}`)
        .then(resp => resp.json())
        .then(dayHabit => {
            if (dayHabit.id) {
                this.setState({checked: true, dayHabitId: dayHabit.id})
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dayId !== this.props.dayId) {
            fetch(`http://localhost:3000/day_habits?habit_id=${this.props.habit.id}&day_id=${this.props.dayId}`)
            .then(resp => resp.json())
            .then(dayHabit => {
                if (dayHabit.id) {
                    this.setState({checked: true, dayHabitId: dayHabit.id})
                }
            })
        }

    }


    createDayHabit = (dayId, habitId) => {
        fetch('http://localhost:3000/day_habits', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({day_id: dayId, habit_id: habitId})
        })
        .then(resp => resp.json())
        .then(dayHabit => {
            this.setState({checked: true, dayHabitId: dayHabit.id})
        })
    }

    deleteDayHabit = (dayHabitId) => {
        fetch(`http://localhost:3000/day_habits/${dayHabitId}`,{method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            this.setState({checked: false, dayHabitId: null})
        })
    }

    toggleCheckboxChange = (e) => {
        if (this.state.dayHabitId) {
            this.deleteDayHabit(this.state.dayHabitId)
        } else {
            this.createDayHabit(this.props.dayId, this.props.habit.id)
        }
    };

    render () {
        return (
            <div className="habit-widget">
                <label>{this.props.habit.title}</label>
                <input className="habit-widget__checkbox" type="checkbox" value="" checked={this.state.checked} onChange={this.toggleCheckboxChange} />
            </div>
        );
    }

}

export default HabitWidget;