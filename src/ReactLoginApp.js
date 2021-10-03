import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, /*removeUserSession,*/ setUserSession } from './Utils/Common';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios.get(`https://api.getcountapp.com/api/v1/users/me= ${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
     // removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Provjera autentikacije...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="navbar navbar-default navbar-fixed-top">
{/*             <NavLink exact activeClassName="active" to="/">Home</NavLink>
 */}            <NavLink activeClassName="active" className="navbar-toggler btn" to="/login">Login</NavLink><small></small>
{/*             <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
 */}          </div>
          <div className="content form-group">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
