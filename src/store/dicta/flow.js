import { originalDictum } from 'store/schemas'
import actions from 'store/dicta/actionCreators'
import api from 'store/dicta/api'
import { call, takeLatest, put } from 'redux-saga/effects'
import { ACTIONS } from 'store/actions'
import { normalize } from 'normalizr'
import { ValidationError } from 'errors/ValidationError'

function* fetchFlow(action) {
    try {
        const response = yield call(api.fetchDictaPage)
        const flatList = normalize(response.data, [originalDictum])
        yield put(actions.fetchReceived(flatList))
    } catch (error) {
        yield put(actions.fetchRejected(error))
    }
}

function* createFlow(action) {
    try {
        const response = yield call(api.createDictum, action.dictum)
        yield put(actions.createReceived(response.data))
    } catch (error) {
        if (error instanceof ValidationError) {
            yield put(actions.createInvalidated(error))
        } else {
            yield put(actions.createRejected(error))
        }
    }
}

export function* dictaFlow() {
    yield takeLatest(ACTIONS.DICTA.FETCH_REQUEST, fetchFlow)
    yield takeLatest(ACTIONS.DICTA.CREATE_REQUEST, createFlow)
}