import React from 'react';
import { connect } from 'react-redux';

import { setUser } from '../redux/actions';
import './login-form.scss';


class LoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    };

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleLoginSubmit = (e) => {
        e.preventDefault()
        this.props.handleLoginSubmit(this.state)
    }

    render(){
        return(
            <form className="login-form" onSubmit={this.handleLoginSubmit}>
                <div className="login-form__header">LOG IN</div>
                <label className="login-form__label">username</label>
                <input className="login-form__input" name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputUpdate}></input>
                <label className="login-form__label">password</label>
                <input className="login-form__input" name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputUpdate} type="password"></input>
                <button className="login-form__button">Submit</button>
            </form>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {handleLoginSubmit: (userCreds) => dispatch(setUser(userCreds))}
};


export default connect(null, mapDispatchToProps)(LoginForm);