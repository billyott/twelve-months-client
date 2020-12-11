import React from 'react';

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

    render(){
        return(
            <div className="login-form">
                <h1 className="login-form__title">LOG IN</h1>
                <label className="login-form__label">username</label>
                <input className="login-form__input" name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputUpdate}></input>
                <label className="login-form__label">password</label>
                <input className="login-form__input" name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputUpdate} type="password"></input>
            </div>
        );
    };

};

export default LoginForm;