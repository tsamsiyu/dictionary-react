import { call, takeLatest, put } from 'redux-saga/effects'
import { ACTIONS } from 'store/actions'
import { fetchCurrentUser } from 'store/auth/api'
import { currentUserReceived, currentUserRejected } from 'store/auth/actionCreators'

export function* fetchCurrentUserFlow() {
    try {
        const response = yield call(fetchCurrentUser)
        yield put(currentUserReceived(response))
    } catch (error) {
        yield put(currentUserRejected(error))
    }
}

export function* authFlow() {
    yield takeLatest(ACTIONS.AUTH.CURRENT_USER_FETCHING, fetchCurrentUserFlow)
}