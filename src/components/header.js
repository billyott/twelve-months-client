import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logUserOut } from '../redux/actions';
import './header.scss';


function Header(props) {


    const handleLogout = () => {<i className="calendar alternate outline icon"></i>
        props.handleLogout()
    }

    return (
        <header className="header">
            <Link className="header__header" to={`/`}>
                <div className="header__logo">
                    <img src="./twelve-months-logo.png" alt="twelve months logo" />
                </div>
                12MONTHS 
            </Link>
            <button className="header__button" onClick={handleLogout}>LOG OUT</button>
        </header>
    );

}

const mapStateToProps = state => {
    return {username: state.user.username}
}

const mapDispatchToProps = dispatch => {
    return {handleLogout: () => dispatch(logUserOut())}
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);