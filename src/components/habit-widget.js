import React from 'react';

import './habit-widget.scss';


class HabitWidget extends React.Component {

    state = {
        checked: false
    };

    toggleCheckboxChange = (e) => {
        this.setState(prevState => {
            return ({checked: !prevState.checked})
        });
    };

    render () {
        return (
            <div className="habit-widget">
                <label>PLACEHOLDER FOR HABIT TITLE</label>
                <input className="habit-widget__checkbox" type="checkbox" value="" checked={this.state.checked} onChange={this.toggleCheckboxChange} />
            </div>
        );
    }

}

export default HabitWidget;