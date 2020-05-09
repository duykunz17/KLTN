import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

// import Consts
import ROUTERS from './router';

class App extends Component {
    render () {
        return (
            <Router>
                <div className="App">
                    <div>
                        { this.showContentMenus(ROUTERS) }
                    </div>
                </div>
            </Router>
        );
    }
    
    showContentMenus = (routers) => {
        let result = null;
        if (routers.length > 0) {
            result = routers.map((router, index) => {
                return (
                    <Route
                        key = {index}
                        path = {router.path}
                        exact = {router.exact}
                        component = {router.main}
                    />
                );
            });
        }
        return <Switch> {result} </Switch>
    }
    
}

export default App;
