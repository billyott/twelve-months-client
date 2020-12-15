import React from 'react';

import './edit-user-form.scss';


class EditUserForm extends React.Component {

    state = {
        email: '',
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
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
                <label className="edit-user-form__label">current password</label>
                <input className="edit-user-form__input" name="password" placeholder="enter current password" value={this.state.currentPassword} onChange={this.handleInputUpdate} type="password"></input>
                <label className="edit-user-form__label">new password</label>
                <input className="edit-user-form__input" name="password" placeholder="enter new password" value={this.state.newPassword} onChange={this.handleInputUpdate} type="password"></input>
                <label className="edit-user-form__label">confirm new password</label>
                <input className="edit-user-form__input" name="password" placeholder="confirm new password" value={this.state.confirmNewPassword} onChange={this.handleInputUpdate} type="password"></input>
            </form>
        );
    }

}

export default EditUserForm;