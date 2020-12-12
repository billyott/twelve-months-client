import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/header';
import NavBar from './components/nav-bar';
import LoginContainer from './containers/login-container';
import HomepageContainer from './containers/homepage-container';
import DayDetailsContainer from './containers/day-details-container';
import AllDaysContainer from './containers/all-days-container';
import ManageHabitsContainer from './containers/manage-habits-container';
import TrendContainer from './containers/trend-container';
import AccountContainer from './containers/account-container';

import './App.css';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <NavBar />
                <Switch>
                    <Route path="/login">
                        <LoginContainer />     
                    </Route>
                    <Route path="/today">
                        <DayDetailsContainer />
                    </Route>
                    <Route path="/days">
                        <AllDaysContainer />
                    </Route>
                    <Route path="/habits">
                        <ManageHabitsContainer />
                    </Route>
                    <Route path="/trends">
                        <TrendContainer />
                    </Route>
                    <Route path="/my-account">
                        <AccountContainer />
                    </Route>
                    <Route path="/">
                        <HomepageContainer />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;