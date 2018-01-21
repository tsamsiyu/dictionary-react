import { ACTIONS } from 'store/actions'
import { WAIT_FOR_ACTION, ERROR_ACTION, CALLBACK_ERROR_ARGUMENT } from 'redux-wait-for-action'

export default {
    // FETCH
    fetchRequest(dictum) {
        return {
            type: ACTIONS.DICTA.FETCH_REQUEST,
            dictum,
        }
    },
    fetchReceived(flatList) {
        return {
            type: ACTIONS.DICTA.FETCH_RECEIVED,
            flatList,
        }
    },
    fetchRejected(fail) {
        return {
            type: ACTIONS.DICTA.FETCH_REJECTED,
            fail,
        }
    },
    // CREATE
    createRequest(dictum) {
        return {
            type: ACTIONS.DICTA.CREATE_REQUEST,
            dictum,
            [WAIT_FOR_ACTION]: ACTIONS.DICTA.CREATE_RECEIVED,
            [ERROR_ACTION]: ACTIONS.DICTA.CREATE_INVALIDATED,
            [CALLBACK_ERROR_ARGUMENT]: action => action.error,
        }
    },
    createReceived(dictum) {
        return {
            type: ACTIONS.DICTA.CREATE_RECEIVED,
            dictum,
        }
    },
    createRejected(fail) {
        return {
            type: ACTIONS.DICTA.CREATE_REJECTED,
            fail,
        }
    },
    createInvalidated(error) {
        return {
            type: ACTIONS.DICTA.CREATE_INVALIDATED,
            error,
        }
    }
}
