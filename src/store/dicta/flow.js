import { originalDictum } from 'store/schemas'
import { receivedDicta, rejectedDicta } from 'store/dicta/actionCreators'
import { fetchPage } from 'store/dicta/api'
import { call, takeLatest, put } from 'redux-saga/effects'
import { ACTIONS } from 'store/actions'
import { normalize } from 'normalizr'

export function* dictaFetchFlow(action) {
    try {
        const response = yield call(fetchPage)
        const flatList = normalize(response.data, [originalDictum])
        yield put(receivedDicta(flatList))
    } catch (error) {
        yield put(rejectedDicta(error))
    }
}

export function* dictaFlow() {
    yield takeLatest(ACTIONS.DICTA.REQUESTING, dictaFetchFlow)
}