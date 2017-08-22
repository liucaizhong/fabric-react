// configure router
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AsyncComponent from '../components/AsyncComponent'

const AsyncHome = AsyncComponent(() => import('./Home'))
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AsyncHome} />
    </Switch>
  </Router>
)

export default App
