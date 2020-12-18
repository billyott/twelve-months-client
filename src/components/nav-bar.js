import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './nav-bar.scss';


class NavBar extends React.Component {

    state = {
        menuOpen: false 
    }

    handleToggleMenu = () => {
        this.setState(prevState => {
            return ({menuOpen: !prevState.menuOpen})
        })
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="nav-bar__hamburger" onClick={this.handleToggleMenu}>
                    <div className="nav-bar__hamburger-line"></div>
                    <div className="nav-bar__hamburger-line"></div>
                    <div className="nav-bar__hamburger-line"></div>
                </div>
                {this.state.menuOpen ? 
                <div className="nav-bar__links-container">
                    <div className="header__sub-header">Hello, {this.props.user.username}!</div>
                    <NavLink to="/" className="nav-bar__link" onClick={this.handleToggleMenu}>HOME</NavLink>
                    <NavLink to="/days" className="nav-bar__link" onClick={this.handleToggleMenu}>ALL DAYS</NavLink>
                    <NavLink to="/habits" className="nav-bar__link" onClick={this.handleToggleMenu}>MANAGE HABITS</NavLink>
                    <NavLink to="/trends" className="nav-bar__link" onClick={this.handleToggleMenu}>MY TRENDS</NavLink>
                    <NavLink to="/my-account" className="nav-bar__link" onClick={this.handleToggleMenu}>MY ACCOUNT</NavLink>
                </div>
                :
                null}
            </div>
            
        );
    }


}

const mapStateToProps = state => {
    return {user: state.user}
}

export default connect(mapStateToProps)(NavBar);