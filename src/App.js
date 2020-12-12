// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/header';
import NavBar from './components/nav-bar';
import LoginContainer from './containers/login-container';
import HomepageContainer from './containers/homepage-container';
import DayDetailsContainer from './containers/day-details-container';
import AllDaysContainer from './containers/all-days-container';
import ManageHabitsContainer from './containers/manage-habits-container';
import TrendContainer from './containers/trend-container'

import './App.css';

function App() {

    return (
        <div className="App">
            <Header />
            <NavBar />
            <LoginContainer />
            <HomepageContainer />
            <DayDetailsContainer />
            <AllDaysContainer />
            <ManageHabitsContainer />
            <TrendContainer />
        </div>
    );
}

export default App;