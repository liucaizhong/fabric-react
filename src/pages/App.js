// configure router
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AsyncComponent from '../components/AsyncComponent'

const AsyncHome = AsyncComponent(() => import('./Home'))
const AsyncSetMeeting = AsyncComponent(
  () => import('../containers/CSetMeeting'),
)
const AsyncSetMeetingDate = AsyncComponent(
  () => import('../containers/CSetMeetingDate'),
)
const AsyncCompApplication = AsyncComponent(
  () => import('../components/CompApplication'),
)
const AsyncEditCompApplication = AsyncComponent(
  () => import('../containers/CEditCompApplication'),
)

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AsyncHome} />
      <Route path="/set-m" component={AsyncSetMeeting} />
      <Route path="/set-m-d" component={AsyncSetMeetingDate} />
      <Route path="/comp-apply" component={AsyncCompApplication} />
      <Route path="/edit-comp-apply" component={AsyncEditCompApplication} />
    </Switch>
  </Router>
)

export default App
