import React from 'react';

import './login-container.scss';
import LoginForm from '../components/login-form';
import NewUserForm from '../components/new-user-form';


function LoginContainer() {


    return (
        <div className="login-container">
            <div className="login-container__left">
                <div className="login-container__left__title">
                    12MONTHS
                </div>
                <div className="login-container__left__sub-title">
                    self-awareness fuels personal growth. data fuels self-awareness.
                </div>
                <div className="login-container__left__sub-title">
                    12MONTHS is a minimalist daily journaling app that allows you to track your habit, mood, and any notes associated with your day. start tracking your year today.
                </div>
            </div>
            <div className="login-container__right">
                <LoginForm />
                <p classname="login-container__right__p">
                    ...or if you're new here...
                </p>
                <NewUserForm />
            </div>
        </div>
    );

}

export default LoginContainer;