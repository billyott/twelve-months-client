import React from 'react';
import { NavLink } from 'react-router-dom'

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
                    <NavLink to="/" className="nav-bar__link">HOME</NavLink>
                    <NavLink to="/days" className="nav-bar__link">ALL DAYS</NavLink>
                    <NavLink to="/habits" className="nav-bar__link">MANAGE HABITS</NavLink>
                    <NavLink to="/trends" className="nav-bar__link">MY TRENDS</NavLink>
                    <NavLink to="/my-account" className="nav-bar__link">MY ACCOUNT</NavLink>
                </div>
                :
                null}
            </div>
            
        );
    }


}

export default NavBar;