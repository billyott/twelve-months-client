import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions';

import './edit-user-form.scss';


class EditUserForm extends React.Component {

    state = {
        email: '',
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        showAccountUpdatedMessage: false
    };

    componentDidMount() {
        this.setState({
            email: this.props.user.email,
            username: this.props.user.username,
            newPassword: this.props.user.password
        })
    }

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleEditUser = (e) => {
        e.preventDefault()
        this.props.handleEditUser({
            id: this.props.user.id,
            email: this.state.email,
            username: this.state.username,
            password: this.state.newPassword,
        });
        this.setState({showAccountUpdatedMessage: true})
        setInterval(() => {
            this.setState({showAccountUpdatedMessage: false})
        }, 4000);
    };

    render(){
        return(
            <div>
                {this.state.showAccountUpdatedMessage ? <div className="edit-user-form__account-update-message">Account updated!</div>: null}
            <form className="edit-user-form" onSubmit={this.handleEditUser}>
                <div className="edit-user-form__text">
                </div>
                {/* <div className="edit-user-form__header">account details</div> */}
                <div className="edit-user-form__input-container">
                    <label className="edit-user-form__label">email address</label>
                    <input className="edit-user-form__input" name="email" placeholder="enter email" value={this.state.email} onChange={this.handleInputUpdate}></input>
                </div>
                <div className="edit-user-form__input-container">
                    <label className="edit-user-form__label">username</label>
                    <input className="edit-user-form__input" name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputUpdate}></input>
                </div>
                {/* <div className="edit-user-form__input-container">
                    <label className="edit-user-form__label">current password</label>
                    <input className="edit-user-form__input" name="password" placeholder="enter current password" value={this.state.currentPassword} onChange={this.handleInputUpdate} type="password"></input>
                </div> */}
                <div className="edit-user-form__input-container">
                    <label className="edit-user-form__label">new password</label>
                    <input className="edit-user-form__input" name="newPassword" placeholder="enter new password" value={this.state.newPassword} onChange={this.handleInputUpdate} type="password"></input>
                </div>
                {/* <div className="edit-user-form__input-container">
                    <label className="edit-user-form__label">confirm new password</label>
                    <input className="edit-user-form__input" name="confirmNewPassword" placeholder="confirm new password" value={this.state.confirmNewPassword} onChange={this.handleInputUpdate} type="password"></input>
                </div> */}
                <button className="edit-user-form__button">update account details</button>
            </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {handleEditUser: (updatedUser) => dispatch(updateUser(updatedUser))}
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);