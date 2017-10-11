import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { setLoginUser } from '../actions/index'
import * as TYPES from '../actions/type'

// get login info
function* setUser() {
  yield put(setLoginUser({
    name: '刘蔡仲',
    comp: '东方证券研究所',
    // avatar: require('../assets/images/login-avatar.png'),
    // 0: admin, 1: analyst, 2: sales
    roleId: 0,
  }))
}

// fetch get
function fetchGet(url, config) {
  return fetch(url, config)
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    return data
  })
  .catch((err) => {
    console.log(err)
  })
}

// load meeting list
function* watchLoadMeetingList() {
  yield takeLatest(TYPES.GET_MEETING_LIST, loadMeetingList)
}

function* loadMeetingList(action) {
  const { url, config } = action

  const data = yield call(fetchGet, url, config)

  yield put(Object.assign({
    type: TYPES.LOAD_MEETING_LIST,
  }, {
    data,
  }))
}

// load comp application list
function* watchLoadCompApplyList() {
  yield takeLatest(TYPES.GET_COMPAPPLY_LIST, loadCompApplyList)
}

function* loadCompApplyList(action) {
  const { url, config } = action

  const data = yield call(fetchGet, url, config)

  yield put(Object.assign({
    type: TYPES.LOAD_COMPAPPLY_LIST,
  }, {
    data,
  }))
}

// submit a meeting
function* watchSubmitMeeting() {
  yield takeEvery(TYPES.SUBMIT_A_MEETING, submitMeeting)
}

function* submitMeeting(action) {
  const { data } = action

  // todo:fetch post
  console.log('submit a meeting', data)

  yield put(Object.assign({
    type: TYPES.RESET_CUR_MEETING_INFO,
  }, {}))
}

// load comp list
function* watchLoadCompList() {
  yield takeLatest(TYPES.GET_COMP_LIST, loadCompList)
}

function* loadCompList(action) {
  const { url, config } = action

  const data = yield call(fetchGet, url, config)

  yield put(Object.assign({
    type: TYPES.LOAD_COMP_LIST,
  }, {
    data,
  }))
}

// load user list
function* watchLoadUserList() {
  yield takeLatest(TYPES.GET_USER_LIST, loadUserList)
}

function* loadUserList(action) {
  const { url, config } = action

  const data = yield call(fetchGet, url, config)

  yield put(Object.assign({
    type: TYPES.LOAD_USER_LIST,
  }, {
    data,
  }))
}

// set current comp application plan
function* watchGetCompApplyPlan() {
  yield takeLatest(TYPES.GET_CUR_COMP_APPLY_PLAN, setCompApplyPlan)
}

function* setCompApplyPlan(action) {
  const { url, config } = action
  console.log('setCompApplyPlan', action)
  const data = yield call(fetchGet, url, config)

  yield put(Object.assign({
    type: TYPES.SET_CUR_COMP_APPLY_PLAN,
  }, {
    data,
  }))
}

// load client application list
function* watchLoadClientApplyList() {
  yield takeLatest(TYPES.GET_CLIENTAPPLY_LIST, loadClientApplyList)
}

function* loadClientApplyList(action) {
  const { url, config } = action

  const data = yield call(fetchGet, url, config)

  yield put(Object.assign({
    type: TYPES.LOAD_CLIENTAPPLY_LIST,
  }, {
    data,
  }))
}

// load customer list
function* watchLoadCustomerList() {
  yield takeLatest(TYPES.GET_CUSTOMER_LIST, loadCustomerList)
}

function* loadCustomerList(action) {
  const { url, config } = action

  const data = yield call(fetchGet, url, config)

  yield put(Object.assign({
    type: TYPES.LOAD_CUSTOMER_LIST,
  }, {
    data,
  }))
}

export default function* rootSaga() {
  yield all([
    call(setUser),
    call(watchLoadMeetingList),
    call(watchSubmitMeeting),
    call(watchLoadCompApplyList),
    call(watchLoadCompList),
    call(watchLoadUserList),
    call(watchGetCompApplyPlan),
    call(watchLoadClientApplyList),
    call(watchLoadCustomerList),
  ])
}
