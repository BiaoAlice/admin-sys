import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import Home from './pages/Home'
import User from './pages/User'
import store from './redux/store'

import './App.less';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/userlist" component={User}></Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
