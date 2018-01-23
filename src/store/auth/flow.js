import { call, takeLatest, put } from 'redux-saga/effects'
import { ACTIONS } from 'store/actions'
import { fetchCurrentUser, login } from 'store/auth/api'
import actions from 'store/auth/actionCreators'
import { ValidationError } from 'errors/ValidationError'

function* fetchCurrentUserFlow() {
    try {
        const response = yield call(fetchCurrentUser)
        yield put(actions.currentUserReceived(response))
    } catch (error) {
        yield put(actions.currentUserRejected(error))
    }
}

function* loginFlow(action) {
    try {
        const response = yield call(login, action.data)
        yield put(actions.loginReceived(response))
    } catch (error) {
        if (error instanceof ValidationError) {
            yield put(actions.loginInvalidated(error))
        } else {
            yield put(actions.loginRejected(error))
        }
    }
}

export function* authFlow() {
    yield takeLatest(ACTIONS.AUTH.CURRENT_USER_FETCHING, fetchCurrentUserFlow)
    yield takeLatest(ACTIONS.AUTH.LOGIN_FETCHING, loginFlow)
}