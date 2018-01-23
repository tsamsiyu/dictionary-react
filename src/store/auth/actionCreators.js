import { ACTIONS } from 'store/actions'
import { WAIT_FOR_ACTION, ERROR_ACTION, CALLBACK_ERROR_ARGUMENT } from 'redux-wait-for-action'

export default {
    currentUserFetch() {
        return {
            type: ACTIONS.AUTH.CURRENT_USER_FETCHING
        }
    },
    currentUserReceived(user) {
        return {
            type: ACTIONS.AUTH.CURRENT_USER_RECEIVED,
            user
        }
    },
    currentUserRejected(error) {
        return {
            type: ACTIONS.AUTH.CURRENT_USER_REJECTED,
            error
        }
    },
    loginFetch(data) {
        return {
            type: ACTIONS.AUTH.LOGIN_FETCHING,
            data,
            [WAIT_FOR_ACTION]: ACTIONS.AUTH.LOGIN_RECEIVED,
            [ERROR_ACTION]: ACTIONS.AUTH.LOGIN_INVALIDATED,
            [CALLBACK_ERROR_ARGUMENT]: action => action.error,
        }
    },
    loginReceived(user) {
        return {
            type: ACTIONS.AUTH.LOGIN_RECEIVED,
            user,
        }
    },
    loginRejected(fail) {
        return {
            type: ACTIONS.AUTH.LOGIN_REJECTED,
            fail,
        }
    },
    loginInvalidated(error) {
        return {
            type: ACTIONS.AUTH.LOGIN_INVALIDATED,
            error,
        }   
    }
}