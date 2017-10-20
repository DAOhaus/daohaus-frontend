import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import ResourceProposal from './layouts/resourceProposal'
import Hub from './layouts/hub'
import Truffle from './layouts/truffle'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="truffle" component={Truffle} />
          <Route path="/hub/:address" component={Hub} />
          <Route path="/resourceProposal/:address" component={ResourceProposal} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
        </Route>
      </Router>
      </MuiThemeProvider>
    </Provider>
  ),
  document.getElementById('root')
)
