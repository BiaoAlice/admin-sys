import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import Home from './pages/Home'
import User from './pages/User'
import Login from './pages/Login'
import Order from './pages/Order'
import store from './redux/store'

import './App.less';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/home" component={Home}/> 
              <Route path="/userlist" component={User}></Route>
              <Route path="/order"component ={Order} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
