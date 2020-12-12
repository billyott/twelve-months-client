import React from 'react';

import './edit-user-form.scss';


class EditUserForm extends React.Component {

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
            <form className="edit-user-form">
                <div className="edit-user-form__text">
                </div>
                <div className="edit-user-form__header">account details</div>
                <label className="edit-user-form__label">email</label>
                <input className="edit-user-form__input" name="email" placeholder="enter email" value={this.state.email} onChange={this.handleInputUpdate}></input>
                <label className="edit-user-form__label">username</label>
                <input className="edit-user-form__input" name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputUpdate}></input>
                <label className="edit-user-form__label">password</label>
                <input className="edit-user-form__input" name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputUpdate} type="password"></input>
            </form>
        );
    }

}

export default EditUserForm;