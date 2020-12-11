import React from 'react';

import './new-user-form.scss';


class NewUserForm extends React.Component {

    state = {
        email: '',
        username: '',
        password: ''
    };

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render(){
        return(
            <div className="new-user-form">
                <h1 className="new-user-form__title">SIGN IN</h1>
                <label className="new-user-form__label">email</label>
                <input className="new-user-form__input" name="email" placeholder="enter email" value={this.state.email} onChange={this.handleInputUpdate}></input>
                <label className="new-user-form__label">username</label>
                <input className="new-user-form__input" name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputUpdate}></input>
                <label className="new-user-form__label">password</label>
                <input className="new-user-form__input" name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputUpdate} type="password"></input>
            </div>
        );
    }

}

export default NewUserForm;