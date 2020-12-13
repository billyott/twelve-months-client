import React from 'react';
import { connect } from 'react-redux';

import { createUser } from '../redux/actions';
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

    createUserSubmitHandler = (e) => {
        e.preventDefault()
        this.props.createUserSubmitHandler(this.state)
    }

    render(){
        return(
            <form className="new-user-form" onSubmit={this.createUserSubmitHandler}>
                <div className="new-user-form__text">
                    ...or if you're new here...
                </div>
                <div className="new-user-form__header">SIGN IN</div>
                <label className="new-user-form__label">email</label>
                <input className="new-user-form__input" name="email" placeholder="enter email" value={this.state.email} onChange={this.handleInputUpdate}></input>
                <label className="new-user-form__label">username</label>
                <input className="new-user-form__input" name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputUpdate}></input>
                <label className="new-user-form__label">password</label>
                <input className="new-user-form__input" name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputUpdate} type="password"></input>
                <button className="new-user__button">Submit</button>
            </form>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {createUserSubmitHandler: (userCreds) => dispatch(createUser(userCreds))}
};


export default connect(null, mapDispatchToProps)(NewUserForm);