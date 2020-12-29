import React from 'react';

import './login-container.scss';
import LoginForm from '../components/login-form';
import NewUserForm from '../components/new-user-form';


function LoginContainer() {


    return (
        <div className="login-container">
            <div className="login-container__left">
                <div className="login-container__header">
                    12MONTHS <i class="book icon"></i>
                </div>
                <div className="login-container__sub-header">
                    self-awareness fuels personal growth. data fuels self-awareness.
                </div>
                <div className="login-container__sub-sub-header">
                    12MONTHS is a minimalist daily journaling app that allows you to track your habits, mood, and any notes associated with your day. start tracking your year today.
                </div>
            </div>
            <div className="login-container__right">
                <div className="login-container__form-container">
                    <LoginForm />
                    <NewUserForm />
                </div>
            </div>
        </div>
    );

}

export default LoginContainer;