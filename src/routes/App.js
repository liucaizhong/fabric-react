// configure router
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AsyncComponent from '../components/AsyncComponent'

const AsyncHome = AsyncComponent(
  () => import('../components/HomeTabBar'),
)
const AsyncSetMeeting = AsyncComponent(
  () => import('../containers/CSetMeeting'),
)
const AsyncSetMeetingDate = AsyncComponent(
  () => import('../containers/CSetMeetingDate'),
)
const AsyncSetMeetingRoom = AsyncComponent(
  () => import('../components/SetMeetingRoom'),
)
const AsyncCompApplication = AsyncComponent(
  () => import('../containers/CCompApplication'),
)
const AsyncRegisterCalendar = AsyncComponent(
  () => import('../containers/CRegisterCalendar'),
)
const AsyncRegisterCompApplication = AsyncComponent(
  () => import('../containers/CRegisterCompApplication'),
)
const AsyncEditCompApplication = AsyncComponent(
  () => import('../containers/CEditCompApplication'),
)
const AsyncClientApplication = AsyncComponent(
  () => import('../containers/CClientApplication'),
)
const AsyncEditClientApplication = AsyncComponent(
  () => import('../components/EditClientApplication'),
)

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AsyncHome} />
      <Route path="/set-m" component={AsyncSetMeeting} />
      <Route path="/set-room" component={AsyncSetMeetingRoom} />
      <Route path="/set-m-d" component={AsyncSetMeetingDate} />
      <Route path="/apply" component={AsyncCompApplication} />
      <Route path="/apply-calendar" component={AsyncRegisterCalendar} />
      <Route path="/edit-comp-apply" component={AsyncEditCompApplication} />
      <Route path="/register-comp" component={AsyncRegisterCompApplication} />
      <Route path="/client-apply-list" component={AsyncClientApplication} />
      <Route path="/edit-client-apply" component={AsyncEditClientApplication} />
    </Switch>
  </Router>
)

export default App
