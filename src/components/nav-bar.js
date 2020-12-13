import React from 'react';
import { NavLink } from 'react-router-dom'

import './nav-bar.scss';


function NavBar() {


    return (
        <div className="nav-bar">
            <NavLink to="/" className="nav-bar__link">HOME</NavLink>
            <NavLink to="/days" className="nav-bar__link">ALL DAYS</NavLink>
            <NavLink to="/habits" className="nav-bar__link">MANAGE HABITS</NavLink>
            <NavLink to="/trends" className="nav-bar__link">MY TRENDS</NavLink>
            <NavLink to="/my-account" className="nav-bar__link">MY ACCOUNT</NavLink>
            <NavLink to="/today" className="nav-bar__link">TODAY placeholder</NavLink>
        </div>
        
    );

}

export default NavBar;