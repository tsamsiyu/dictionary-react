import { originalDictum } from 'store/schemas';
import { requestingDicta, receivedDicta, rejectedDicta } from 'store/dicta/actionCreators';
import { fetchPage } from 'store/dicta/api';
import { call, takeLatest, put } from 'redux-saga';
import { ACTIONS } from 'store/actions';

export function* dictaFetchFlow(action) {
    try {
        put(requestingDicta());
        const response = yield call(fetchPage);
        const entities = normalize(response.data, [originalDictum]);
        put(receivedDicta(entities));
    } catch (error) {
        put(rejectedDicta(error));
    }
}

export function* dictaFlow() {
    yield takeLatest(ACTIONS.DICTA.FETCH, dictaFetchFlow);
}