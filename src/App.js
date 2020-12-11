// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import LoginContainer from './containers/login-container'
import Header from './components/header'
import NavBar from './components/nav-bar'
import HomepageContainer from './containers/homepage-container';
import './App.css';

function App() {

    return (
        <div className="App">
            <Header />
            <NavBar />
            <LoginContainer />
            <HomepageContainer />
        </div>
    );
}

export default App;